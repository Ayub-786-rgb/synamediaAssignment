const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Doctor = require('./doctor');

const Appointment = sequelize.define('Appointment', {
  patientFirstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientLastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  doctorId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Appointment.belongsTo(Doctor); // Associate appointment with doctor

module.exports = Appointment;
