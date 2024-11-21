import express from 'express';
import {
         prescribeMedication,
         getPrescibeById,
         getPrescibeAll
          } from '../controllers/prescribeController.js';

import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();


// Hàm kê đơn thuốc
router.post('/presmdc/:id', prescribeMedication )
router.get('/getpresmdc/', getPrescibeAll )
router.get('/getpresmdc/:id', getPrescibeById )


export default router;
