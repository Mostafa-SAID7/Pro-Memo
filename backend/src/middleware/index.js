/**
 * Middleware Index
 * Central export for all middleware
 */

const auth = require('./auth.middleware');
const validation = require('./validation.middleware');
const error = require('./error.middleware');
const security = require('./security.middleware');
const logger = require('./logger.middleware');
const upload = require('./upload.middleware');
const cache = require('./cache.middleware');

module.exports = {
  // Auth
  ...auth,
  
  // Validation
  validate: validation.validate,
  validators: validation.validators,
  
  // Error handling
  errorHandler: error.errorHandler,
  notFound: error.notFound,
  errorLogger: logger.errorLogger,
  
  // Security
  sanitizeInput: security.sanitizeInput,
  securityHeaders: security.securityHeaders,
  apiLimiter: security.apiLimiter,
  authLimiter: security.authLimiter,
  strictLimiter: security.strictLimiter,
  
  // Logger
  requestLogger: logger.requestLogger,
  
  // Upload
  upload: upload.upload,
  uploadSingle: upload.uploadSingle,
  uploadMultiple: upload.uploadMultiple,
  uploadFields: upload.uploadFields,
  
  // Cache
  cache: cache.cache,
  clearCache: cache.clearCache
};
