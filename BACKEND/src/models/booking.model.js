import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
    pickupPoint: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },
    seatsBooked: { type: Number },
    cargoSpaceBooked: { type: Number },
    bookingType: {
      type: String,
      enum: ['passenger', 'cargo', 'mixed'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'canceled'],
      default: 'pending',
    },
    otp: {
      code: { type: String }, // OTP code for passenger verification
      expiresAt: { type: Date }, // Expires 10 hours after ride departure
    },
    isVerified: { type: Boolean, default: false }, // OTP verification status
    cancellation: {
      reason: { type: String },
      timestamp: { type: Date },
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

bookingSchema.methods.generateOTP = function (rideDepartureDate) {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiration = new Date(rideDepartureDate);
  otpExpiration.setHours(otpExpiration.getHours() + 10); // Expires 10 hours after ride departure
  this.otp = { code: otpCode, expiresAt: otpExpiration };
  return otpCode;
};

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
