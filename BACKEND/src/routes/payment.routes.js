import { Router } from 'express';
import { initiatePayment, confirmPayment } from '../controllers/paymentController.js';

const router = Router();

router.post('/initiate', initiatePayment);//initiate payment
router.post('/:paymentId/confirm', confirmPayment);//confirmation

export default router;