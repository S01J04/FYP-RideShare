import mongoose from 'mongoose';
const liveTrackingSchema = new mongoose.Schema(
  {
    rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
    currentLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    lastUpdated: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'completed', 'inactive', 'delayed', 'unknown'], default: 'active' },
  },
  { timestamps: true }
);

// Add geospatial index
liveTrackingSchema.index({ currentLocation: '2dsphere' });

const LiveTracking = mongoose.model('LiveTracking', liveTrackingSchema);
export default LiveTracking;
