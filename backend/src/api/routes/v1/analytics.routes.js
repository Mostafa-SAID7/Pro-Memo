/**
 * Analytics Routes
 */

const express = require('express');
const router = express.Router();
const { analytics: analyticsController } = require('../../controllers');
const { protect, cache } = require('../../../middleware');

// All routes require authentication
router.use(protect);

router.get('/dashboard', cache(600), analyticsController.getDashboardStats);
router.get('/tasks', cache(600), analyticsController.getTaskAnalytics);
router.get('/projects', cache(600), analyticsController.getProjectAnalytics);
router.get('/productivity', cache(600), analyticsController.getProductivityMetrics);
router.get('/trends', cache(600), analyticsController.getTrends);

module.exports = router;
