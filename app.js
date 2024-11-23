const express = require('express');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/appointmentRoutes');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', appointmentRoutes);

// Sync database and start the server
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(err => console.error('Error syncing database:', err));
