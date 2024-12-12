const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }

  const allowedKeys = process.env.ALLOWED_API_KEYS.split(',');
  
  if (!allowedKeys.includes(apiKey)) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  next();
};

module.exports = { validateApiKey }; 