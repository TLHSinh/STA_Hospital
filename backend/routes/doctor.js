import express from 'express';
import { getAllDoctor, getSingleDoctor, updateDoctor, deleteDoctor, addDoctor, getDoctorProfile } from '../controllers/doctorController.js';

import { authenticate , restrict} from '../auth/veryfyToken.js';

const router = express.Router();


// Đảm bảo route đăng ký sử dụng phương thức POST
router.get('/:id', getSingleDoctor);
router.get('/',getAllDoctor);
router.put('/:id', authenticate, restrict(["doctor"]), updateDoctor);
router.delete('/:id', authenticate, restrict(["doctor"]), deleteDoctor);
router.post('/addDoctor', addDoctor);

router.get('/profile/me', getDoctorProfile); 
//router.get('/appointment/my-appointment', getMyAppointments); 
export default router;
