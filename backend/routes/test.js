import express from 'express';
import {
    newTest,
    getTestResultById,
    getAllTestResults,
    getAllListTest
          } from '../controllers/testController.js';

import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();


// Hàm kê đơn thuốc
router.post('/newtest/:id', newTest )
router.get('/gettest/', getAllTestResults )
router.get('/gettest/:id', getTestResultById )

router.get('/getListtest/', getAllListTest )



export default router;
