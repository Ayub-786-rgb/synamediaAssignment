const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { patientFirstName, patientLastName, patientEmail, timeSlot, doctorName } = req.body;
  try {
    // Find doctor by name
    const doctor = await Doctor.findOne({ where: { name: doctorName } });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    let doctorId=doctor.dataValues.id
    console.log(doctorId,"doctorId")


    // Create the appointment
    const appointment = await Appointment.create({
      patientFirstName,
      patientLastName,
      patientEmail,
      timeSlot,
      doctorId: doctorId,
    });

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
};

// Get appointment details by patient's email
exports.getAppointmentByEmail = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: { patientEmail: req.params.patientEmail },
      include: Doctor, // Include doctor details in the response
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment details', error });
  }
};

// Get all appointments for a specific doctor
exports.getAppointmentsByDoctor = async (req, res) => {
    console.log(req.params.doctorName,'kkkkkkkkk')
  try {
    const appointments = await Appointment.findAll({
      where: { '$Doctor.name$': req.params.doctorName },
      include: Doctor,
    });
    console.log(appointments,"appointments")

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  const { patientEmail, timeSlot } = req.body;
  try {
    const appointment = await Appointment.findOne({
      where: { patientEmail, timeSlot },
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.destroy();
    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error canceling appointment', error });
  }
};

// Modify an existing appointment
exports.modifyAppointment = async (req, res) => {
  const { patientEmail, timeSlot, newTimeSlot } = req.body;
  try {
    const appointment = await Appointment.findOne({
      where: { patientEmail, timeSlot },
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.timeSlot = newTimeSlot;
    await appointment.save();
    res.status(200).json({ message: 'Appointment modified successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error modifying appointment', error });
  }
};
