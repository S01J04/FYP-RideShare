import { Router } from 'express';
import rideRoutes from './ride.routes.js';
import bookingRoutes from './booking.routes.js';
import paymentRoutes from './payment.routes.js';
import chatRoutes from './chat.routes.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import userRoutes from './user.routes.js';
import vechile from './vechile.routes.js';
import mapsRoutes from './maps.routes.js';

const router = Router();

router.use('/users', userRoutes); // ride routes
router.use('/maps',verifyJWT,mapsRoutes ); //map routes
router.use('/rides', verifyJWT, rideRoutes); // ride routes
router.use('/bookings', verifyJWT, bookingRoutes); // booking routes
router.use('/payments', verifyJWT, paymentRoutes); // payment routes
router.use('/chats', verifyJWT, chatRoutes); // chat routes
router.use('/vehicles', verifyJWT, vechile); // vechile routes

export default router;