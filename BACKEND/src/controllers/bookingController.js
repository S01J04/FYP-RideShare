import  Booking  from '../models/booking.model.js';
import  Ride  from '../models/Ride.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import  ApiError  from '../utils/ApiError.js';
import  createNotification  from '../utils/notifications.js';
import ApiResponse from '../utils/ApiResponse.js';
import { sendMessageToSocketId } from '../utils/socket.js';
import userModel from '../models/user.model.js';

export const createBooking = asyncHandler(async (req, res) => {
  const { rideId, pickupPoint, seatsBooked, bookingType } = req.body; 
  
  const ride = await Ride.findById(rideId);
  if (!ride) throw new ApiError(404, 'Ride not found');
  
  if (ride.availableSeats < seatsBooked) {
    throw new ApiError(400, 'Not enough seats available');
  }

   let driver = await userModel.findById(ride.driverId);
   if(!driver){
     throw new ApiError(404, 'Driver not found');
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
 const notification= await createNotification({
    userId: ride.driverId,
    type: 'booking_update',
    message: 'New booking received'
  });

   // Create the message object
   const messageObject = {
    event: "driver_notification",
    data: { notification , bookingId: booking._id },
  };
    // Emit socket event for real-time notifications
  sendMessageToSocketId(driver.socketId, messageObject);
  
  res.status(201).json(
    new ApiResponse(201, booking, 'Booking created successfully')
  );
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
  
  res.json(
    new ApiResponse(200, booking, 'Booking canceled successfully')
  );
});