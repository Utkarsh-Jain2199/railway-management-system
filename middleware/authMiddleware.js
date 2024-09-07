const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send('Authorization token is required');
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;