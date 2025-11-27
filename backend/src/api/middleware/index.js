/**
 * Middleware Index
 * Central export for all middleware
 */

module.exports = {
  // Auth middleware
  auth: require('./auth/auth'),
  roleCheck: require('./auth/roleCheck'),
  
  // Validation middleware
  validate: require('./validation/validate'),
  validators: require('./validation/validators'),
  
  // Security middleware
  security: require('./security/security'),
  rateLimiter: require('./security/rateLimiter'),
  
  // Performance middleware
  performance: require('./performance/performance'),
  cache: require('./performance/cache'),
  
  // Error handling
  errorHandler: require('./error/errorHandler'),
  
  // File upload
  upload: require('./upload/upload')
};
