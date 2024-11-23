const request = require('supertest');
const app = require('../app');  // Make sure your app.js is exported

describe('Appointment API', () => {
  it('should create an appointment successfully', async () => {
    const response = await request(app)
      .post('/api/appointments')
      .send({
        patientFirstName: 'John',
        patientLastName: 'Doe',
        patientEmail: 'john.doe@example.com',
        timeSlot: '10:00 AM - 11:00 AM',
        doctorName: 'Dr. Smith'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Appointment booked successfully');
  });

  it('should get an appointment by email', async () => {
    const response = await request(app)
      .get('/api/appointments/john.doe@example.com');

    expect(response.status).toBe(200);
    expect(response.body.patientEmail).toBe('john.doe@example.com');
  });
});
