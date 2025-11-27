/**
 * Admin Routes
 */

const express = require('express');
const router = express.Router();
const { admin: adminController } = require('../../controllers');
const { protect, restrictTo } = require('../../../middleware');

// All routes require authentication and admin role
router.use(protect);
router.use(restrictTo('admin'));

router.get('/users', adminController.getAllUsers);
router.get('/stats', adminController.getSystemStats);
router.post('/backup', adminController.createBackup);
router.get('/logs', adminController.getLogs);
router.delete('/users/:id', adminController.deleteUser);
router.patch('/users/:id/role', adminController.updateUserRole);

module.exports = router;
