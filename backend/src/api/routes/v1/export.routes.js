/**
 * Export Routes
 */

const express = require('express');
const router = express.Router();
const { export: exportController } = require('../../controllers');
const { protect, strictLimiter } = require('../../../middleware');

// All routes require authentication
router.use(protect);
router.use(strictLimiter); // Export endpoints are rate-limited

router.post('/tasks', exportController.exportTasks);
router.post('/projects', exportController.exportProjects);
router.post('/analytics', exportController.exportAnalytics);
router.get('/download/:id', exportController.downloadExport);

module.exports = router;
