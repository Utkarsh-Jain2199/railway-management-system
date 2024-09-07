// /routes/trainRoutes.js
const express = require('express');
const { getSeatAvailability } = require('../controllers/trainController');
const router = express.Router();

router.get('/availability', getSeatAvailability);

module.exports = router;
