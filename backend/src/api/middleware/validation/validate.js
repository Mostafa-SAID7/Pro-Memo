/**
 * Validation Middleware
 */

const { validationResult } = require('express-validator');
const { ValidationError } = require('../../../shared/errors');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));
    
    return next(new ValidationError('Validation failed', errorMessages));
  }
  
  next();
};

module.exports = validate;
