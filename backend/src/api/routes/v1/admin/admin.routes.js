/**
 * Admin Routes
 */

const express = require('express');
const router = express.Router();
const { admin: adminController } = require('../../../controllers');
const { protect, restrictTo, validators, validate } = require('../../middleware');

// All routes require authentication and admin role
router.use(protect);
router.use(restrictTo('admin'));

// User Management
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', validators.mongoId, validate, adminController.getUserById);
router.delete('/users/:id', validators.mongoId, validate, adminController.deleteUser);
router.patch('/users/:id/role', validators.mongoId, validate, adminController.updateUserRole);
router.patch('/users/:id/status', validators.mongoId, validate, adminController.updateUserStatus);

// System Stats
router.get('/stats', adminController.getSystemStats);
router.get('/stats/users', adminController.getUserStats);
router.get('/stats/projects', adminController.getProjectStats);
router.get('/stats/tasks', adminController.getTaskStats);

// System Management
router.post('/backup', adminController.createBackup);
router.get('/backups', adminController.listBackups);
router.post('/restore/:backupId', adminController.restoreBackup);
router.get('/logs', adminController.getLogs);
router.delete('/logs', adminController.clearLogs);

// Settings
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

module.exports = router;
