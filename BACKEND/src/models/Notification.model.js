
import mongoose from 'mongoose';
const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['booking_update', 'payment_reminder', 'ride_status', 'general'], required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    cargoDetails: { type: Object }, // Structure to be clarified during implementation
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1 });
notificationSchema.index({ isRead: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
