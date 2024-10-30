import express from 'express';
import { getAllDoctor, getSingleDoctor, updateDoctor, deleteDoctor, addDoctor, getDoctorProfile, addWorkingSchedule, getWorkingSchedule } from '../controllers/doctorController.js';

import { authenticate , restrict} from '../auth/veryfyToken.js';

const router = express.Router();


// Đảm bảo route đăng ký sử dụng phương thức POST
router.get('/:id', getSingleDoctor);
router.get('/',getAllDoctor);
router.put('/:id', authenticate, restrict(["BacSi"]), updateDoctor);
router.delete('/:id', authenticate, restrict(["BacSi"]), deleteDoctor);
// router.put('/:id', authenticate, restrict(["doctor","admin"]), updateDoctor);
// router.delete('/:id', authenticate, restrict(["admin"]), deleteDoctor);
router.post('/addDoctor', addDoctor)
router.post('/addWorkingSchedule/:id', addWorkingSchedule);
router.get('/getWorkingSchedule/:id', getWorkingSchedule);

// router.get('/profile/me', getDoctorProfile); 
//router.get('/appointment/my-appointment', getMyAppointments); 
export default router;
