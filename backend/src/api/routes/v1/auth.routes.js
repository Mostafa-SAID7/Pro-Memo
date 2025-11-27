/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const { auth: authController } = require('../../controllers');
const { protect, validators, validate, authLimiter } = require('../../../middleware');

// Public routes (with rate limiting)
router.post('/register', authLimiter, validators.register, validate, authController.register);
router.post('/login', authLimiter, validators.login, validate, authController.login);

// Protected routes
router.use(protect);
router.get('/me', authController.getCurrentUser);
router.put('/profile', validators.updateProfile, validate, authController.updateProfile);
router.post('/change-password', validators.changePassword, validate, authController.changePassword);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
