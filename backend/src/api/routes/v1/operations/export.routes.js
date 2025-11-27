/**
 * Export Routes
 */

const express = require('express');
const router = express.Router();
const { export: exportController } = require('../../../controllers');
const { protect, strictLimiter, validators, validate } = require('../../../middleware');

// All routes require authentication
router.use(protect);
router.use(strictLimiter); // Export endpoints are rate-limited

// Export Data
router.post('/tasks', exportController.exportTasks);
router.post('/projects', exportController.exportProjects);
router.post('/analytics', exportController.exportAnalytics);
router.post('/all', exportController.exportAll);

// Export Formats
router.post('/csv', exportController.exportToCsv);
router.post('/excel', exportController.exportToExcel);
router.post('/pdf', exportController.exportToPdf);
router.post('/json', exportController.exportToJson);

// Download
router.get('/download/:id', validators.mongoId, validate, exportController.downloadExport);
router.get('/history', exportController.getExportHistory);
router.delete('/history/:id', validators.mongoId, validate, exportController.deleteExport);

module.exports = router;
