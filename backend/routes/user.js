import express from 'express';
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

// Đảm bảo route đăng ký sử dụng phương thức POST
router.get('/:id', getSingleUser);
router.get('/', getAllUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
