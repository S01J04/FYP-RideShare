import  Chat  from '../models/Chat.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import  ApiError  from '../utils/ApiError.js';

export const createChatRoom = asyncHandler(async (req, res) => {
  const { participantId } = req.body;
  const userId = req.user._id;
  
  // Create unique chat room ID
  const chatRoomId = [userId, participantId].sort().join('_');
  
  let chatRoom = await Chat.findOne({ chatRoomId });
  
  if (!chatRoom) {
    chatRoom = await Chat.create({
      chatRoomId,
      participants: [userId, participantId]
    });
  }
  
  res.json({ success: true, chatRoom });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { chatRoomId, content } = req.body;
  
  const chatRoom = await Chat.findOne({ chatRoomId });
  if (!chatRoom) throw new ApiError(404, 'Chat room not found');
  
  const message = {
    senderId: req.user._id,
    content,
    timestamp: new Date()
  };
  
  chatRoom.messages.push(message);
  await chatRoom.save();
  
  // Emit socket event for real-time updates
  req.io.to(chatRoomId).emit('new_message', {
    chatRoomId,
    message
  });
  
  res.json({ success: true, message });
});

export const getChatHistory = asyncHandler(async (req, res) => {
  const { chatRoomId } = req.params;
  
  const chatRoom = await Chat.findOne({ chatRoomId })
    .populate('participants', 'fullName profilePicture');
    
  if (!chatRoom) throw new ApiError(404, 'Chat room not found');
  
  res.json({ success: true, chatRoom });
});