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

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getDashboardStats(req.user.id);
  successResponse(res, stats, 'Dashboard stats retrieved successfully');
});

exports.getOverview = asyncHandler(async (req, res) => {
  const overview = await analyticsService.getDashboardStats(req.user.id);
  successResponse(res, overview, 'Overview retrieved successfully');
});

exports.getTaskAnalytics = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getTaskAnalytics(req.user.id, req.query);
  successResponse(res, analytics, 'Task analytics retrieved successfully');
});

exports.getTaskCompletionRate = asyncHandler(async (req, res) => {
  const rate = await analyticsService.getTaskAnalytics(req.user.id, req.query);
  successResponse(res, rate, 'Task completion rate retrieved successfully');
});

exports.getOverdueTasks = asyncHandler(async (req, res) => {
  successResponse(res, [], 'Overdue tasks retrieved successfully');
});

exports.getProjectDetailedAnalytics = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getProjectAnalytics(req.user.id);
  successResponse(res, analytics, 'Project detailed analytics retrieved successfully');
});

exports.getProductivityMetrics = asyncHandler(async (req, res) => {
  const metrics = await analyticsService.getProductivityMetrics(req.user.id);
  successResponse(res, metrics, 'Productivity metrics retrieved successfully');
});

exports.getUserProductivity = asyncHandler(async (req, res) => {
  const productivity = await analyticsService.getProductivityMetrics(req.params.userId || req.user.id);
  successResponse(res, productivity, 'User productivity retrieved successfully');
});

exports.getTrends = asyncHandler(async (req, res) => {
  const trends = await analyticsService.getTrends(req.user.id, req.query.period);
  successResponse(res, trends, 'Trends retrieved successfully');
});

exports.getDailyTrends = asyncHandler(async (req, res) => {
  const trends = await analyticsService.getTrends(req.user.id, 'daily');
  successResponse(res, trends, 'Daily trends retrieved successfully');
});

exports.getWeeklyTrends = asyncHandler(async (req, res) => {
  const trends = await analyticsService.getTrends(req.user.id, 'weekly');
  successResponse(res, trends, 'Weekly trends retrieved successfully');
});

exports.getMonthlyTrends = asyncHandler(async (req, res) => {
  const trends = await analyticsService.getTrends(req.user.id, 'monthly');
  successResponse(res, trends, 'Monthly trends retrieved successfully');
});
