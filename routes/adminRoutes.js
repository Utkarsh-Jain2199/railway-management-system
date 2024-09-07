// /routes/adminRoutes.js
const express = require('express');
const { addTrain } = require('../controllers/trainController');
const verifyAdminApiKey = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/add-train', verifyAdminApiKey, addTrain);

module.exports = router;
