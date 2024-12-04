import mongoose from 'mongoose';
const ratingsAndReviewsSchema = new mongoose.Schema(
  {
    rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String },
  },
  { timestamps: true }
);

ratingsAndReviewsSchema.index({ rideId: 1 });
ratingsAndReviewsSchema.index({ userId: 1 });

const RatingsAndReviews = mongoose.model('RatingsAndReviews', ratingsAndReviewsSchema);
export default RatingsAndReviews;
