import express from 'express';
import { addUser, deleteUser, getAllUser, getMyAppointments, getSingleUser, getUserProfile, updateUser } from '../controllers/userController.js';
import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();

// Đảm bảo route đăng ký sử dụng phương thức POST
router.get('/:id', getSingleUser); // Thay "admin" bằng "quanTriVien"
router.get('/', getAllUser);
router.put('/:id', updateUser); // Thay "patient" bằng "benhNhan"
router.delete('/:id', deleteUser); // Thay "patient" bằng "benhNhan"
router.post('/addUser', addUser);
router.get('/profile/me', getUserProfile); 
router.get('/appointment/my-appointment', getMyAppointments); 

export default router;
