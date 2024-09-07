function verifyAdminApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).send('Invalid API key');
    }
    next();
  }
  
  module.exports = verifyAdminApiKey;