import express from 'express';
import { createMedicalRecordWithAppointment, createMedicalRecordForNewPatient, createMedicalRecordWithoutAppointment,prescribeMedication, getMedicalRecordById, updateMedicalRecordStatus, deleteMedicalRecordById  } from '../controllers/medicalRecordController.js';

import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();

router.post('/mdcRecord-appoint', createMedicalRecordWithAppointment )
router.post('/mdcRecord-newppte', createMedicalRecordForNewPatient )
router.post('/mdcRecord-noappoint', createMedicalRecordWithoutAppointment )

//lấy bệnh án
router.post('/getmdcRecord/:id', getMedicalRecordById )
router.post('/updatemdcRecord/:id', updateMedicalRecordStatus )
router.post('/delmdcRecord/:id', deleteMedicalRecordById )

// Hàm kê đơn thuốc
router.post('/presmdc', prescribeMedication )

export default router;
