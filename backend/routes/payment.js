import express from 'express';
import {   newPayment ,confirmPayment, getInvoiceById      } from '../controllers/paymentController.js';

import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();


// Hàm kê đơn thuốc
router.post('/:id', newPayment)
router.put('/confirmPayment/:id', confirmPayment)
router.get('/getpayment/:id', getInvoiceById);




export default router;
