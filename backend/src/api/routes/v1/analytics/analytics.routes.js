/**
 * Analytics Routes
 */

const express = require('express');
const router = express.Router();
const { analytics: analyticsController } = require('../../../controllers');
const { protect, cache } = require('../../../middleware');

// All routes require authentication
router.use(protect);

// Dashboard & Overview
router.get('/dashboard', cache(600), analyticsController.getDashboardStats);
router.get('/overview', cache(600), analyticsController.getOverview);

// Task Analytics
router.get('/tasks', cache(600), analyticsController.getTaskAnalytics);
router.get('/tasks/completion', cache(600), analyticsController.getTaskCompletionRate);
router.get('/tasks/overdue', cache(300), analyticsController.getOverdueTasks);

// Project Analytics
router.get('/projects', cache(600), analyticsController.getProjectAnalytics);
router.get('/projects/:id', cache(600), analyticsController.getProjectDetailedAnalytics);

// Productivity
router.get('/productivity', cache(600), analyticsController.getProductivityMetrics);
router.get('/productivity/user/:userId', cache(600), analyticsController.getUserProductivity);

// Trends
router.get('/trends', cache(600), analyticsController.getTrends);
router.get('/trends/daily', cache(600), analyticsController.getDailyTrends);
router.get('/trends/weekly', cache(600), analyticsController.getWeeklyTrends);
router.get('/trends/monthly', cache(600), analyticsController.getMonthlyTrends);

module.exports = router;
