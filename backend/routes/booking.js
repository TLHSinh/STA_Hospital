/* // nâng cao hơn
import express from 'express';
import { authenticate, restrict } from '../auth/veryfyToken.js';
import {getCheckoutSession} from '../controllers/bookingController.js';

const router = express.Router()
router.post('checkout-session/:doctorId', authenticate, getCheckoutSession)

export default router; */

import express from 'express';
import { authenticate, restrict } from '../auth/veryfyToken.js';
import {booking, updateBookingStatus,getAllBookings} from '../controllers/bookingController.js';

const router = express.Router()
router.post('/booking', booking )
router.put('/booking/:id', updateBookingStatus )
router.get('/', getAllBookings )
export default router;