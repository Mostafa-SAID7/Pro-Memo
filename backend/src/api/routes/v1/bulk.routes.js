/**
 * Bulk Operations Routes
 */

const express = require('express');
const router = express.Router();
const { bulk: bulkController } = require('../../controllers');
const { protect, strictLimiter, clearCache } = require('../../../middleware');

// All routes require authentication
router.use(protect);
router.use(strictLimiter); // Bulk operations are rate-limited
router.use(clearCache('*')); // Clear all cache on bulk operations

router.post('/tasks/create', bulkController.createTasks);
router.patch('/tasks/update', bulkController.updateTasks);
router.delete('/tasks/delete', bulkController.deleteTasks);
router.patch('/tasks/status', bulkController.updateTasksStatus);
router.post('/import', bulkController.importData);

module.exports = router;
