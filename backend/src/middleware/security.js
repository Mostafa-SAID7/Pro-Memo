/**
 * Security Middleware
 */

const sanitizeInput = (req, res, next) => {
  // Basic input sanitization
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  next();
};

const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
};

module.exports = {
  sanitizeInput,
  securityHeaders
};
