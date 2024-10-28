import express from 'express';
import { addUser, deleteUser, getAllUser, getMyAppointments, getSingleUser, getUserProfile, updateUser } from '../controllers/userController.js';
import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();

// Đảm bảo route đăng ký sử dụng phương thức POST
<<<<<<< HEAD
router.get('/:id', getSingleUser); // Thay "admin" bằng "quanTriVien"
router.get('/', getAllUser);
router.put('/:id', updateUser); // Thay "patient" bằng "benhNhan"
router.delete('/:id', deleteUser); // Thay "patient" bằng "benhNhan"
=======
router.get('/:id', authenticate, restrict(["admin"]), getSingleUser); 
router.get('/', getAllUser);
router.put('/:id', authenticate, restrict(["admin"]), updateUser); 
router.delete('/:id', deleteUser); 
>>>>>>> 9d47c448c52ba162c737f32d1c138a44bafec592
router.post('/addUser', addUser);
router.get('/profile/me', getUserProfile); 
router.get('/appointment/my-appointment', getMyAppointments); 

export default router;
