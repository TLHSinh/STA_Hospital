import express from 'express';
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';


import { authenticate , restrict} from '../auth/veryfyToken.js';
const router = express.Router();

// Đảm bảo route đăng ký sử dụng phương thức POST
router.get('/:id', authenticate, restrict(["patient"]), getSingleUser);
router.get('/',authenticate,  getAllUser);
router.put('/:id', authenticate, restrict(["patient"]),updateUser);
router.delete('/:id', authenticate, restrict(["patient"]),deleteUser);

export default router;
