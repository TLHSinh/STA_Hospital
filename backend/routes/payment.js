import express from 'express';
import {   newPayment ,confirmPayment, getInvoiceById ,createMoMoPayment, handleMoMoIpn     } from '../controllers/paymentController.js';

import { authenticate, restrict} from '../auth/veryfyToken.js';

const router = express.Router();


// Hàm kê đơn thuốc
router.post('/:id', newPayment)
router.put('/confirmPayment/:id', confirmPayment)
router.get('/getpayment/:id', getInvoiceById);

// Tạo yêu cầu thanh toán qua MoMo
router.post("/momo/:id", createMoMoPayment);

// Xử lý IPN từ MoMo
router.post("/momo-ipn", handleMoMoIpn);



export default router;
