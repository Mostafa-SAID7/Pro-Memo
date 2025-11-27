/**
 * Activity Routes
 */

const express = require('express');
const router = express.Router();
const { activity: activityController } = require('../../controllers');
const { protect, cache } = require('../../../middleware');

// All routes require authentication
router.use(protect);

router.get('/', activityController.getActivities);
router.get('/user/:userId', activityController.getUserActivities);
router.get('/project/:projectId', activityController.getProjectActivities);
router.get('/task/:taskId', activityController.getTaskActivities);

module.exports = router;
