import express from 'express';
import { getAllDoctor, getSingleDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';

const router = express.Router();

// Đảm bảo route đăng ký sử dụng phương thức POST
router.get('/:id', getSingleDoctor);
router.get('/', getAllDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

export default router;
