/**
 * Analytics Controller
 */

const analyticsService = require('../../../core/services/analytics/analyticsService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

exports.getProjectAnalytics = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getProjectAnalytics(req.params.projectId, req.user.id);
  successResponse(res, analytics, 'Project analytics retrieved successfully');
});

exports.getUserAnalytics = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const analytics = await analyticsService.getUserAnalytics(req.user.id, { startDate, endDate });
  successResponse(res, analytics, 'User analytics retrieved successfully');
});

exports.getTeamAnalytics = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getTeamAnalytics(req.params.projectId, req.user.id);
  successResponse(res, analytics, 'Team analytics retrieved successfully');
});

exports.getDashboardOverview = asyncHandler(async (req, res) => {
  const overview = await analyticsService.getDashboardOverview(req.user.id);
  successResponse(res, overview, 'Dashboard overview retrieved successfully');
});
