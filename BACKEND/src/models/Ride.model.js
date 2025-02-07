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
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String, required: true },
        isUserAdded: { type: Boolean, default: false }, // Passenger-added stop
      },
    ],
    totalSeats: { type: Number,  required: function () { return this.rideType !== 'cargo'; }},
    departureDate: { type: Date, required: true },
    availableSeats: { type: Number, required: function () { return this.rideType !== 'cargo'; } },
    cargoCapacity: { type: Number, required: function () { return this.rideType !== 'passenger'; } },
    pricePerSeat: { type: Number, required: function () { return this.rideType !== 'cargo'; } },
    pricePerCubicFoot: { type: Number, required: function () { return this.rideType !== 'passenger'; } },
    polyline: { type: String }, // Encoded polyline for route tracking
    status: {
      type: String,
      enum: ['scheduled', 'ongoing', 'completed', 'canceled', 'delayed', 'rescheduled'],
      default: 'scheduled',
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
rideSchema.index({ driverId: 1 });
rideSchema.index({ departureDate: 1 });
rideSchema.index({ status: 1 });
rideSchema.index({ startLocation: "2dsphere" });
rideSchema.index({ endLocation: "2dsphere" });

const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
