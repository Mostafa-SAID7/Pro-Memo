/**
 * Task Controller
 * Handles task CRUD operations
 */

const taskService = require('../../../core/services/task/taskService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

// Create task
exports.createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.user.id, req.body);
  
  successResponse(res, task, 'Task created successfully', null, 201);
});

// Get all tasks
exports.getTasks = asyncHandler(async (req, res) => {
  const { data, pagination } = await taskService.getTasks(req.user.id, req.query);
  
  successResponse(res, data, 'Tasks retrieved successfully', pagination);
});

// Get task by ID
exports.getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id, req.user.id);
  
  successResponse(res, task, 'Task retrieved successfully');
});

// Update task
exports.updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.user.id, req.body);
  
  successResponse(res, task, 'Task updated successfully');
});

// Delete task
exports.deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user.id);
  
  successResponse(res, null, 'Task deleted successfully');
});

// Add comment
exports.addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const task = await taskService.addComment(req.params.id, req.user.id, text);
  
  successResponse(res, task, 'Comment added successfully');
});

// Update comment
exports.updateComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const task = await taskService.updateComment(req.params.id, req.params.commentId, req.user.id, text);
  
  successResponse(res, task, 'Comment updated successfully');
});

// Delete comment
exports.deleteComment = asyncHandler(async (req, res) => {
  const task = await taskService.deleteComment(req.params.id, req.params.commentId, req.user.id);
  
  successResponse(res, task, 'Comment deleted successfully');
});
