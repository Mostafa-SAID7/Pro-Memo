/**
 * Activity Routes
 */

const express = require('express');
const router = express.Router();
const { activity: activityController } = require('../../../controllers');
const { protect, cache, validators, validate } = require('../../middleware');

// All routes require authentication
router.use(protect);

// Get activities
router.get('/', cache(60), activityController.getActivities);
router.get('/recent', cache(30), activityController.getRecentActivities);
router.get('/feed', activityController.getActivityFeed);

// Filter by entity
router.get('/user/:userId', validators.mongoId, validate, cache(60), activityController.getUserActivities);
router.get('/project/:projectId', validators.mongoId, validate, cache(60), activityController.getProjectActivities);
router.get('/task/:taskId', validators.mongoId, validate, cache(60), activityController.getTaskActivities);

// Activity stats
router.get('/stats', cache(300), activityController.getActivityStats);
router.get('/timeline', cache(60), activityController.getActivityTimeline);

module.exports = router;
