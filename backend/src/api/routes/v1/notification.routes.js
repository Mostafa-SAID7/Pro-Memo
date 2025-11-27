/**
 * Notification Routes
 */

const express = require('express');
const router = express.Router();
const { notification: notificationController } = require('../../controllers');
const { protect } = require('../../../middleware');

// All routes require authentication
router.use(protect);

router.get('/', notificationController.getNotifications);
router.get('/unread', notificationController.getUnreadNotifications);
router.patch('/:id/read', notificationController.markAsRead);
router.patch('/read-all', notificationController.markAllAsRead);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
