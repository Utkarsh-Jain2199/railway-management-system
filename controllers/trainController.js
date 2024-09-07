const pool = require('../config/db');

async function addTrain(req, res) {
  const { trainNumber, source, destination, seats } = req.body;
  await pool.query(
    'INSERT INTO trains (train_number, source, destination, seats) VALUES ($1, $2, $3, $4)',
    [trainNumber, source, destination, seats]
  );
  res.status(201).send('Train added successfully');
}

async function getSeatAvailability(req, res) {
  const { source, destination } = req.query;
  const result = await pool.query('SELECT * FROM trains WHERE source = $1 AND destination = $2', [source, destination]);
  res.send(result.rows);
}

module.exports = { addTrain, getSeatAvailability };