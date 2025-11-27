/**
 * Task Routes
 */

const express = require('express');
const router = express.Router();
const { task: taskController } = require('../../controllers');
const { protect, validators, validate, cache, clearCache } = require('../../../middleware');

// All routes require authentication
router.use(protect);

router.get('/', cache(180), taskController.getAllTasks);
router.post('/', validators.createTask, validate, clearCache('tasks*'), taskController.createTask);
router.get('/:id', validators.mongoId, validate, cache(180), taskController.getTaskById);
router.put('/:id', validators.mongoId, validators.updateTask, validate, clearCache('tasks*'), taskController.updateTask);
router.delete('/:id', validators.mongoId, validate, clearCache('tasks*'), taskController.deleteTask);
router.patch('/:id/status', taskController.updateTaskStatus);
router.patch('/:id/priority', taskController.updateTaskPriority);
router.post('/:id/comments', taskController.addComment);
router.get('/:id/comments', taskController.getComments);

module.exports = router;
