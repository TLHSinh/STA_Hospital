import express from 'express';
import {
         prescribeMedication
          } from '../controllers/prescribeController.js';

import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();


// Hàm kê đơn thuốc
router.post('/presmdc/:id', prescribeMedication )

export default router;
