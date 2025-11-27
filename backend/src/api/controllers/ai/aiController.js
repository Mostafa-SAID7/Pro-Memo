/**
 * AI Controller
 */

const aiService = require('../../../core/services/ai/aiService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

exports.getSmartSuggestions = asyncHandler(async (req, res) => {
  const suggestions = await aiService.getSmartSuggestions(req.user.id, req.query);
  successResponse(res, suggestions, 'Suggestions retrieved successfully');
});

exports.getProjectHealth = asyncHandler(async (req, res) => {
  const health = await aiService.calculateProjectHealth(req.params.projectId);
  successResponse(res, health, 'Project health calculated successfully');
});

exports.suggestTaskPriority = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;
  const priority = aiService.suggestTaskPriority(title, description, dueDate);
  successResponse(res, { priority }, 'Priority suggested successfully');
});

exports.estimateTaskTime = asyncHandler(async (req, res) => {
  const { title, description, projectId } = req.body;
  const estimatedHours = await aiService.estimateTaskTime(title, description, projectId);
  successResponse(res, { estimatedHours }, 'Time estimated successfully');
});

exports.suggestAssignee = asyncHandler(async (req, res) => {
  const { projectId, taskTitle, taskDescription } = req.body;
  const assigneeId = await aiService.suggestAssignee(projectId, taskTitle, taskDescription);
  successResponse(res, { assigneeId }, 'Assignee suggested successfully');
});

exports.generateSubtasks = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const subtasks = aiService.generateSubtasks(title, description);
  successResponse(res, { subtasks }, 'Subtasks generated successfully');
});
