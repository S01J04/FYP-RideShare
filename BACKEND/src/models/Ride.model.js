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
    starttime:{ type: String, required: true },
    endtime:{ type: String, required: true },
    totalDistance:{ type: String, required: true },
    totalDuration:{ type: String, required: true },
    availableSeats: { type: Number },
    cargoCapacity: { type: Number, required: function () { return this.rideType !== 'passenger'; } },
    pricePerSeat: { type: Number, required: function () { return this.rideType !== 'cargo'; } },
    priceCargoCapacity: { type: Number, required: function () { return this.rideType !== 'passenger'; } },
    polyline: { type: String }, // Encoded polyline for route tracking
    status: {
      type: String,
      enum: ['scheduled', 'ongoing', 'completed', 'canceled', 'delayed', 'rescheduled'],
      default: 'scheduled',
    },
    rideCode:{
      type: String,
      unique: true,
    }
  },
  { timestamps: true }
);

// Indexes for better query performance
rideSchema.index({ driverId: 1 });
rideSchema.index({ departureDate: 1 });
rideSchema.index({ status: 1 });
rideSchema.index({ startLocation: "2dsphere" });
rideSchema.index({ endLocation: "2dsphere" });
// Function to generate a unique rideCode before saving
rideSchema.pre("save", async function (next) {
  if (!this.rideCode) {
    const shortStart = this.startLocation.address.slice(0, 3).toUpperCase(); // e.g., "LAH" for Lahore
    const rideDate = this.departureDate.toISOString().split("T")[0].replace(/-/g, ""); // YYYYMMDD format
    const randomPart = Math.random().toString(36).substr(2, 5).toUpperCase(); // Random unique string

    this.rideCode = `RIDE-${shortStart}-${rideDate}-${randomPart}`;
    console.log(this.rideCode)
  }
  next();
});


const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
