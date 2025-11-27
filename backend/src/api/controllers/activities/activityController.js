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
