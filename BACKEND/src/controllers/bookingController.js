import  Booking  from '../models/booking.model.js';
import  Ride  from '../models/Ride.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import  ApiError  from '../utils/ApiError.js';
import  createNotification  from '../utils/notifications.js';

export const createBooking = asyncHandler(async (req, res) => {
  const { rideId, pickupPoint, seatsBooked, bookingType } = req.body; 
  
  const ride = await Ride.findById(rideId);
  if (!ride) throw new ApiError(404, 'Ride not found');
  
  if (ride.availableSeats < seatsBooked) {
    throw new ApiError(400, 'Not enough seats available');
  }
  
  const booking = await Booking.create({
    userId: req.user._id,
    rideId,
    pickupPoint,
    seatsBooked,
    bookingType
  });
  
  // Update available seats
  await Ride.findByIdAndUpdate(rideId, {
    $inc: { availableSeats: -seatsBooked }
  });
  
  // Create notification for driver
  await createNotification({
    userId: ride.driverId,
    type: 'booking_update',
    message: 'New booking received'
  });
  
  res.status(201).json({ success: true, booking });
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  const booking = await Booking.findById(req.params.id);
  
  if (!booking) throw new ApiError(404, 'Booking not found');
  if (booking.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized to cancel this booking');
  }
  
  booking.status = 'canceled';
  booking.cancellation = {
    reason,
    timestamp: new Date()
  };
  await booking.save();
  
  // Restore available seats
  await Ride.findByIdAndUpdate(booking.rideId, {
    $inc: { availableSeats: booking.seatsBooked }
  });
  
  res.json({ success: true, booking });
});