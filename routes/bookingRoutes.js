const express = require('express');
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book-seat', authenticateJWT, bookSeat);
router.get('/booking/:id', authenticateJWT, getBookingDetails);

module.exports = router;
