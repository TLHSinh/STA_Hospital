import express from 'express';
import { getDashboardStats } from '../controllers/statisticsController.js';

const router = express.Router();

// Route: Lấy thống kê
router.get('/stats', getDashboardStats);

export default router;