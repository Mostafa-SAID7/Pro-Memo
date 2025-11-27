/**
 * Notification Routes
 */

const express = require('express');
const router = express.Router();
const { notification: notificationController } = require('../../../controllers');
const { protect, validators, validate } = require('../../../middleware');

// All routes require authentication
router.use(protect);

// Get notifications
router.get('/', notificationController.getNotifications);
router.get('/unread', notificationController.getUnreadNotifications);
router.get('/count', notificationController.getUnreadCount);

// Manage notifications
router.patch('/:id/read', validators.mongoId, validate, notificationController.markAsRead);
router.patch('/read-all', notificationController.markAllAsRead);
router.delete('/:id', validators.mongoId, validate, notificationController.deleteNotification);
router.delete('/clear-all', notificationController.clearAllNotifications);

// Notification preferences
router.get('/preferences', notificationController.getPreferences);
router.put('/preferences', notificationController.updatePreferences);

module.exports = router;
