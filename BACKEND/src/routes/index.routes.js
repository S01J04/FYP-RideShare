import { Router } from 'express';
import rideRoutes from './ride.routes.js';
import bookingRoutes from './booking.routes.js';
import paymentRoutes from './payment.routes.js';
import chatRoutes from './chat.routes.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.use('/rides', verifyJWT, rideRoutes); // ride routes
router.use('/bookings', verifyJWT, bookingRoutes); // booking routes
router.use('/payments', verifyJWT, paymentRoutes); // payment routes
router.use('/chats', verifyJWT, chatRoutes); // chat routes

export default router;