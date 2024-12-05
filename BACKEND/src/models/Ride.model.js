import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema(
  {
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    rideType: {
      type: String,
      enum: ['passenger', 'cargo', 'mixed'],
      required: true,
    },
    passengers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        pickupPoint: {
          lat: { type: Number, required: true },
          lng: { type: Number, required: true },
          address: { type: String, required: true },
        },
        isVerified: { type: Boolean, default: false }, // Verified through OTP
      },
    ],
    cargoBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    startLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },
    endLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String, required: true },
    },
    stops: [
      {
        lat: { type: Number },
        lng: { type: Number },
        address: { type: String },
      },
    ],
    departureDate: { type: Date, required: true },
    availableSeats: { type: Number },
    cargoCapacityAvailable: { type: Number },
    pricePerSeat: { type: Number },
    pricePerCubicFoot: { type: Number },
    status: {
      type: String,
      enum: ['scheduled', 'ongoing', 'completed', 'canceled', 'delayed', 'rescheduled'],
      default: 'scheduled',
    },
  },
  { timestamps: true }
);

rideSchema.index({ driverId: 1 });
rideSchema.index({ departureDate: 1 });

const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
