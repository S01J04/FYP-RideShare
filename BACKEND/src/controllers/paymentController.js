import  Payment  from '../models/Payment.model.js';
import  Booking  from '../models/booking.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import  ApiError  from '../utils/ApiError.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const initiatePayment = asyncHandler(async (req, res) => {
  const { bookingId, paymentMethod } = req.body;
  
  const booking = await Booking.findById(bookingId)
    .populate('rideId');
  
  if (!booking) throw new ApiError(404, 'Booking not found');
  
  const amount = booking.seatsBooked * booking.rideId.pricePerSeat;
  
  const payment = await Payment.create({
    bookingId,
    amount,
    userId: req.user._id,
    paymentMethod
  });
  
  let paymentIntent;
  if (paymentMethod === 'credit_card') {
    paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: { bookingId, paymentId: payment._id.toString() }
    });
  }
  
  res.json({
    success: true,
    payment,
    clientSecret: paymentIntent?.client_secret
  });
});

export const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  
  const payment = await Payment.findByIdAndUpdate(
    paymentId,
    {
      status: 'completed',
      timestamp: new Date()
    },
    { new: true }
  );
  
  if (!payment) throw new ApiError(404, 'Payment not found');
  
  // Update booking payment status
  await Booking.findByIdAndUpdate(payment.bookingId, {
    paymentStatus: 'completed'
  });
  
  res.json({ success: true, payment });
});