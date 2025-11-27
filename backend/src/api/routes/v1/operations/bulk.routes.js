/**
 * Bulk Operations Routes
 */

const express = require('express');
const router = express.Router();
const { bulk: bulkController } = require('../../../controllers');
const { protect, strictLimiter, clearCache } = require('../../middleware');

// All routes require authentication
router.use(protect);
router.use(strictLimiter); // Bulk operations are rate-limited

// Bulk Task Operations
router.post('/tasks/create', clearCache('tasks*'), bulkController.createTasks);
router.patch('/tasks/update', clearCache('tasks*'), bulkController.updateTasks);
router.delete('/tasks/delete', clearCache('tasks*'), bulkController.deleteTasks);
router.patch('/tasks/status', clearCache('tasks*'), bulkController.updateTasksStatus);
router.patch('/tasks/priority', clearCache('tasks*'), bulkController.updateTasksPriority);
router.patch('/tasks/assign', clearCache('tasks*'), bulkController.assignTasks);
router.patch('/tasks/move', clearCache('*'), bulkController.moveTasks);

// Bulk Project Operations
router.post('/projects/create', clearCache('projects*'), bulkController.createProjects);
router.patch('/projects/update', clearCache('projects*'), bulkController.updateProjects);
router.delete('/projects/delete', clearCache('*'), bulkController.deleteProjects);
router.patch('/projects/archive', clearCache('projects*'), bulkController.archiveProjects);

// Import
router.post('/import', clearCache('*'), bulkController.importData);
router.post('/import/csv', clearCache('*'), bulkController.importFromCsv);
router.post('/import/json', clearCache('*'), bulkController.importFromJson);

module.exports = router;
