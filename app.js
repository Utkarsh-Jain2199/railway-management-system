// /app.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const trainRoutes = require('./routes/trainRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/book', bookingRoutes);
app.use('/train', trainRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
