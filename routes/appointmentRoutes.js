const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Define routes for appointment operations
router.post('/appointments', appointmentController.createAppointment);
router.get('/appointments/:patientEmail', appointmentController.getAppointmentByEmail);
router.get('/appointments/doctor/:doctorName', appointmentController.getAppointmentsByDoctor);
router.delete('/appointments', appointmentController.cancelAppointment);
router.put('/appointments', appointmentController.modifyAppointment);

module.exports = router;
