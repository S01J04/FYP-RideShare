import { Router } from 'express';
import { createChatRoom, sendMessage, getChatHistory } from '../controllers/chatController.js';

const router = Router();

router.post('/rooms', createChatRoom); // Create a chat room
router.post('/messages', sendMessage); // Send a message
router.get('/rooms/:chatRoomId', getChatHistory); // Get chat history

export default router;