/**
 * Logger Middleware
 */

const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  
  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    const resetColor = '\x1b[0m';
    
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${statusColor}${res.statusCode}${resetColor} (${duration}ms)`
    );
  });
  
  next();
};

const errorLogger = (err, req, res, next) => {
  console.error('\x1b[31m[ERROR]\x1b[0m', {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
  next(err);
};

module.exports = {
  requestLogger,
  errorLogger
};
