import express from 'express';
import { addUser, deleteUser, getAllUser, getMyAppointments, getSingleUser, getUserProfile, updateUser ,getUserEorP} from '../controllers/userController.js';
import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();

// Đảm bảo route đăng ký sử dụng phương thức POST

router.get('/:id', authenticate, restrict(["admin", "BenhNhan"]), getSingleUser); 
router.get('/', authenticate, restrict(["admin"]),getAllUser);
router.put('/:id', authenticate, restrict(["admin", "BenhNhan"]), updateUser); 
router.delete('/:id', deleteUser); 

router.post('/addUser', addUser);
router.get('/profile/me', getUserProfile); 
router.get('/appointment/my-appointment', getMyAppointments); 
router.post('/search', getUserEorP);


export default router;