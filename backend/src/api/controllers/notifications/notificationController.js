/**
 * Notification Controller
 */

const notificationService = require('../../../core/services/notification/notificationService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

exports.getNotifications = asyncHandler(async (req, res) => {
  const { data, pagination } = await notificationService.getNotifications(req.user.id, req.query);
  successResponse(res, data, 'Notifications retrieved successfully', pagination);
});

exports.markAsRead = asyncHandler(async (req, res) => {
  await notificationService.markAsRead(req.params.id, req.user.id);
  successResponse(res, null, 'Notification marked as read');
});

exports.markAllAsRead = asyncHandler(async (req, res) => {
  const result = await notificationService.markAllAsRead(req.user.id);
  successResponse(res, result, 'All notifications marked as read');
});

exports.deleteNotification = asyncHandler(async (req, res) => {
  await notificationService.deleteNotification(req.params.id, req.user.id);
  successResponse(res, null, 'Notification deleted successfully');
});

exports.getUnreadCount = asyncHandler(async (req, res) => {
  const count = await notificationService.getUnreadCount(req.user.id);
  successResponse(res, { count }, 'Unread count retrieved successfully');
});
