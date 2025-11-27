/**
 * Task Routes
 */

const express = require('express');
const router = express.Router();
const { task: taskController } = require('../../../controllers');
const { protect, validators, validate, cache, clearCache } = require('../../../middleware');

// All routes require authentication
router.use(protect);

// Task CRUD
router.get('/', cache(180), taskController.getAllTasks);
router.post('/', validators.createTask, validate, clearCache('tasks*'), taskController.createTask);
router.get('/:id', validators.mongoId, validate, cache(180), taskController.getTaskById);
router.put('/:id', validators.mongoId, validators.updateTask, validate, clearCache('tasks*'), taskController.updateTask);
router.delete('/:id', validators.mongoId, validate, clearCache('tasks*'), taskController.deleteTask);

// Task status & priority
router.patch('/:id/status', validators.mongoId, validate, clearCache('tasks*'), taskController.updateTaskStatus);
router.patch('/:id/priority', validators.mongoId, validate, clearCache('tasks*'), taskController.updateTaskPriority);
router.patch('/:id/assign', validators.mongoId, validate, taskController.assignTask);

// Task comments
router.get('/:id/comments', validators.mongoId, validate, taskController.getComments);
router.post('/:id/comments', validators.mongoId, validate, taskController.addComment);
router.delete('/:id/comments/:commentId', validators.mongoId, validate, taskController.deleteComment);

// Task attachments
router.get('/:id/attachments', validators.mongoId, validate, taskController.getAttachments);
router.post('/:id/attachments', validators.mongoId, validate, taskController.addAttachment);
router.delete('/:id/attachments/:attachmentId', validators.mongoId, validate, taskController.deleteAttachment);

module.exports = router;
