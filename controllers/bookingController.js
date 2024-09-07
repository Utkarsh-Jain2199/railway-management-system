const pool = require('../config/db');

async function bookSeat(req, res) {
  const { trainId } = req.body;
  try {
    await pool.query('BEGIN');
    const result = await pool.query('SELECT seats FROM trains WHERE id = $1 FOR UPDATE', [trainId]);
    const availableSeats = result.rows[0].seats;
    if (availableSeats > 0) {
      await pool.query('UPDATE trains SET seats = seats - 1 WHERE id = $1', [trainId]);
      await pool.query('INSERT INTO bookings (user_id, train_id) VALUES ($1, $2)', [req.user.userId, trainId]);
      await pool.query('COMMIT');
      res.send('Seat booked successfully');
    } else {
      await pool.query('ROLLBACK');
      res.status(400).send('No seats available');
    }
  } catch (error) {
    await pool.query('ROLLBACK');
    res.status(500).send('Error booking seat');
  }
}

async function getBookingDetails(req, res) {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM bookings WHERE id = $1 AND user_id = $2', [id, req.user.userId]);
  if (result.rows.length === 0) {
    return res.status(404).send('Booking not found');
  }
  res.send(result.rows[0]);
}

module.exports = { bookSeat, getBookingDetails };
