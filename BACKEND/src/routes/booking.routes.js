import { Router } from 'express';
import { createBooking, cancelBooking } from '../controllers/bookingController.js';

const router = Router();

router.post('/create-booking', createBooking); // Create a booking
router.post('/cancel-booking/:id/cancel', cancelBooking); // Cancel a booking

export default router;