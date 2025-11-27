/**
 * Validation Middleware
 */

const { validationResult } = require('express-validator');
const { body, param, query } = require('express-validator');
const { ValidationError } = require('../../shared/errors');

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

// Validators
const validators = {
  // Auth validators
  register: [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  
  login: [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  
  updateProfile: [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required')
  ],
  
  changePassword: [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],

  // Project validators
  createProject: [
    body('name').trim().notEmpty().withMessage('Project name is required'),
    body('description').optional().trim(),
    body('status').optional().isIn(['planning', 'active', 'on-hold', 'completed', 'archived']),
    body('priority').optional().isIn(['low', 'medium', 'high', 'urgent'])
  ],

  updateProject: [
    body('name').optional().trim().notEmpty().withMessage('Project name cannot be empty'),
    body('description').optional().trim(),
    body('status').optional().isIn(['planning', 'active', 'on-hold', 'completed', 'archived']),
    body('priority').optional().isIn(['low', 'medium', 'high', 'urgent'])
  ],

  // Task validators
  createTask: [
    body('title').trim().notEmpty().withMessage('Task title is required'),
    body('description').optional().trim(),
    body('projectId').notEmpty().withMessage('Project ID is required'),
    body('status').optional().isIn(['todo', 'in-progress', 'review', 'done', 'blocked']),
    body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
    body('dueDate').optional().isISO8601().withMessage('Invalid date format')
  ],

  updateTask: [
    body('title').optional().trim().notEmpty().withMessage('Task title cannot be empty'),
    body('description').optional().trim(),
    body('status').optional().isIn(['todo', 'in-progress', 'review', 'done', 'blocked']),
    body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
    body('dueDate').optional().isISO8601().withMessage('Invalid date format')
  ],

  // ID validators
  mongoId: [
    param('id').isMongoId().withMessage('Invalid ID format')
  ]
};

module.exports = {
  validate,
  validators
};
