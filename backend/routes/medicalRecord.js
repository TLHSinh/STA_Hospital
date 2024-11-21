import express from 'express';
import { createMedicalRecordWithAppointment,
         createMedicalRecordForNewPatient, 
         createMedicalRecordWithoutAppointment,
         getMedicalRecordById, 
         updateMedicalRecordStatus, 
         deleteMedicalRecordById,
         getMedicalRecordAll,
         getDoctorMDCR,
         getPatientMDCR,
         updateMDC
          } from '../controllers/medicalRecordController.js';

import { authenticate, restrict } from '../auth/veryfyToken.js';

const router = express.Router();

router.post('/mdcRecord-appoint/:id', createMedicalRecordWithAppointment )
router.post('/mdcRecord-newppte', createMedicalRecordForNewPatient )
router.post('/mdcRecord-noappoint:/id', createMedicalRecordWithoutAppointment )

//lấy bệnh án
router.get('/getmdcRecordAll', getMedicalRecordAll )
router.get('/getmdcRecord/:id', getMedicalRecordById )
router.get('/getdocmdcRecord/:id', getDoctorMDCR )
router.get('/getpatimdcRecord/:id', getPatientMDCR )

router.put('/updatemdcRecord/:id', updateMedicalRecordStatus )
router.put('/updateMDC/:id', updateMDC )
router.delete('/delmdcRecord/:id', deleteMedicalRecordById )



export default router;
