const bcrypt = require('bcrypt');
const pool = require('../config/db');
const { generateToken } = require('../utils/jwtUtils');

async function register(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
    [name, email, hashedPassword]
  );
  res.status(201).send(`User registered with ID: ${result.rows[0].id}`);
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (user.rows.length === 0 || !(await bcrypt.compare(password, user.rows[0].password))) {
    return res.status(403).send('Invalid email or password');
  }
  const token = generateToken(user.rows[0]);
  res.send({ token });
}

module.exports = { register, login };
