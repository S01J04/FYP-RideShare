import Notification from '../models/Notification.model.js'; // Default import

 const createNotification = async ({
  userId,
  type,
  message,
  priority = 'low'
}) => {
  const notification = await Notification.create({
    userId,
    type,
    message,
    priority
  });
  
  // Emit socket event for real-time notifications
  global.io?.to(userId.toString()).emit('new_notification', notification);
  
  return notification;
};
export default createNotification