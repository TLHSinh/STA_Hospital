import express from 'express';
import { addUser, deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();

// Đảm bảo route đăng ký sử dụng phương thức POST
router.get('/:id', authenticate, restrict(["benhnhan"]), getSingleUser); // Thay "admin" bằng "quanTriVien"
router.get('/', getAllUser);
router.put('/:id', authenticate, restrict(["benhhan"]), updateUser); // Thay "patient" bằng "benhNhan"
router.delete('/:id', deleteUser); // Thay "patient" bằng "benhNhan"
router.post('/addUser', addUser);

export default router;
