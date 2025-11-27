/**
 * Authentication Controller
 * Handles user authentication operations
 */

const authService = require('../../../core/services/auth/authService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

// Register new user
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await authService.register(name, email, password);
  
  successResponse(res, result, 'User registered successfully', null, 201);
});

// Login user
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  
  successResponse(res, result, 'Login successful');
});

// Get current user
exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);
  
  successResponse(res, user, 'User retrieved successfully');
});

// Update profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const user = await authService.updateProfile(req.user.id, { name, email });
  
  successResponse(res, user, 'Profile updated successfully');
});

// Change password
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(req.user.id, currentPassword, newPassword);
  
  successResponse(res, null, 'Password changed successfully');
});

// Logout
exports.logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user.id);
  
  successResponse(res, null, 'Logout successful');
});

// Refresh token
exports.refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.refreshToken(refreshToken);
  
  successResponse(res, result, 'Token refreshed successfully');
});
