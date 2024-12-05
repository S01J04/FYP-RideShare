import mongoose from 'mongoose';
const chatSchema = new mongoose.Schema(
  {
    chatRoomId: { type: String, required: true, unique: true }, // Ensure chatRoomId is unique
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [
      {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        readStatus: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

// Add indexes for efficient queries
chatSchema.index({ chatRoomId: 1 });
chatSchema.index({ participants: 1 });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
