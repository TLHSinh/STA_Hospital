import express from 'express';
import { authenticate, restrict } from '../auth/veryfyToken.js';
import {booking, updateBookingStatus,getAllBookings,deleteBookingById} from '../controllers/bookingController.js';

const router = express.Router()
router.post('/booking', booking )
router.put('/booking/:id', updateBookingStatus )
router.get('/', getAllBookings )
router.delete('/delete/:id', deleteBookingById )
export default router;