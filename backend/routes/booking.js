import express from 'express';
import { authenticate, restrict } from '../auth/veryfyToken.js';
import {booking, updateBookingStatus,getAllBookings,deleteBookingById, getBookingById,getDoctorAppointments, getPatientAppointments, getUpcomingAppointments } from '../controllers/bookingController.js';

const router = express.Router()
router.post('/booking', booking )
router.put('/booking/:id', updateBookingStatus )
router.get('/', getAllBookings )
router.get('/:id', getBookingById )
router.get('/getpteAppoint/:id', getPatientAppointments )
router.get('/getdocAppoint/:id', getDoctorAppointments )


router.delete('/delete/:id', deleteBookingById )


router.get('/upcoming', getUpcomingAppointments)
export default router;