// /utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { generateToken };