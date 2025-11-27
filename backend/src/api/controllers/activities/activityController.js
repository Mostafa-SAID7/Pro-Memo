/**
 * Activity Controller
 */

const activityService = require('../../../core/services/activity/activityService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

exports.getTimeline = asyncHandler(async (req, res) => {
  const activities = await activityService.getTimeline(req.query);
  successResponse(res, activities, 'Timeline retrieved successfully');
});

exports.getUserActivitySummary = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { days } = req.query;
  const summary = await activityService.getUserActivitySummary(userId, parseInt(days) || 30);
  successResponse(res, summary, 'User activity summary retrieved successfully');
});

exports.getProjectActivitySummary = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { days } = req.query;
  const summary = await activityService.getProjectActivitySummary(projectId, parseInt(days) || 30);
  successResponse(res, summary, 'Project activity summary retrieved successfully');
});

exports.getActivities = asyncHandler(async (req, res) => {
  const { data, pagination } = await activityService.getActivities(req.query);
  successResponse(res, data, 'Activities retrieved successfully', pagination);
});

exports.getRecentActivities = asyncHandler(async (req, res) => {
  const activities = await activityService.getRecentActivities(req.user.id, req.query.limit || 10);
  successResponse(res, activities, 'Recent activities retrieved successfully');
});

exports.getActivityFeed = asyncHandler(async (req, res) => {
  const feed = await activityService.getActivityFeed(req.user.id, req.query);
  successResponse(res, feed, 'Activity feed retrieved successfully');
});

exports.getUserActivities = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const activities = await activityService.getUserActivities(userId, req.query);
  successResponse(res, activities, 'User activities retrieved successfully');
});

exports.getProjectActivities = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const activities = await activityService.getProjectActivities(projectId, req.query);
  successResponse(res, activities, 'Project activities retrieved successfully');
});

exports.getTaskActivities = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const activities = await activityService.getTaskActivities(taskId, req.query);
  successResponse(res, activities, 'Task activities retrieved successfully');
});

exports.getActivityStats = asyncHandler(async (req, res) => {
  const stats = await activityService.getActivityStats(req.user.id, req.query);
  successResponse(res, stats, 'Activity stats retrieved successfully');
});

exports.getActivityTimeline = asyncHandler(async (req, res) => {
  const timeline = await activityService.getTimeline(req.query);
  successResponse(res, timeline, 'Activity timeline retrieved successfully');
});
