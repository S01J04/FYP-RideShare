import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
      pickupPoint: { type: Object, required: true }, // Includes lat, lng, and address
      seatsBooked: { type: Number },
      cargoSpaceBooked: { type: Number }, // For cargo bookings
      bookingType: { type: String, enum: ['passenger', 'cargo', 'mixed'], required: true },
      status: { type: String, enum: ['confirmed', 'canceled', 'completed'], default: 'confirmed' },
      cancellation: {
        reason: { type: String },
        timestamp: { type: Date },
      },
      paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    },
    { timestamps: true }
  );
  
  const Booking = mongoose.model('Booking', bookingSchema);
  
  export default Booking;
  