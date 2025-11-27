/**
 * Bulk Operations Controller
 */

const bulkService = require('../../../core/services/bulk/bulkService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

exports.bulkUpdateTasks = asyncHandler(async (req, res) => {
  const { taskIds, updates } = req.body;
  const result = await bulkService.bulkUpdateTasks(taskIds, updates, req.user.id);
  successResponse(res, result, `Updated ${result.modifiedCount} tasks successfully`);
});

exports.bulkDeleteTasks = asyncHandler(async (req, res) => {
  const { taskIds } = req.body;
  const result = await bulkService.bulkDeleteTasks(taskIds, req.user.id);
  successResponse(res, result, `Deleted ${result.deletedCount} tasks successfully`);
});

exports.bulkAssignTasks = asyncHandler(async (req, res) => {
  const { taskIds, assigneeId } = req.body;
  const result = await bulkService.bulkAssignTasks(taskIds, assigneeId, req.user.id);
  successResponse(res, result, `Assigned ${result.modifiedCount} tasks successfully`);
});

exports.bulkUpdateProjects = asyncHandler(async (req, res) => {
  const { projectIds, updates } = req.body;
  const result = await bulkService.bulkUpdateProjects(projectIds, updates, req.user.id);
  successResponse(res, result, `Updated ${result.modifiedCount} projects successfully`);
});

exports.createTasks = asyncHandler(async (req, res) => {
  const result = await bulkService.createTasks(req.body.tasks, req.user.id);
  successResponse(res, result, 'Tasks created successfully');
});

exports.updateTasks = asyncHandler(async (req, res) => {
  const { taskIds, updates } = req.body;
  const result = await bulkService.updateTasks(taskIds, updates);
  successResponse(res, result, 'Tasks updated successfully');
});

exports.deleteTasks = asyncHandler(async (req, res) => {
  const { taskIds } = req.body;
  const result = await bulkService.deleteTasks(taskIds);
  successResponse(res, result, 'Tasks deleted successfully');
});

exports.updateTasksStatus = asyncHandler(async (req, res) => {
  const { taskIds, status } = req.body;
  const result = await bulkService.updateTasksStatus(taskIds, status);
  successResponse(res, result, 'Task statuses updated successfully');
});

exports.updateTasksPriority = asyncHandler(async (req, res) => {
  const { taskIds, priority } = req.body;
  const result = await bulkService.updateTasksPriority(taskIds, priority);
  successResponse(res, result, 'Task priorities updated successfully');
});

exports.assignTasks = asyncHandler(async (req, res) => {
  const { taskIds, assigneeId } = req.body;
  const result = await bulkService.assignTasks(taskIds, assigneeId);
  successResponse(res, result, 'Tasks assigned successfully');
});

exports.moveTasks = asyncHandler(async (req, res) => {
  const { taskIds, projectId } = req.body;
  const result = await bulkService.moveTasks(taskIds, projectId);
  successResponse(res, result, 'Tasks moved successfully');
});

exports.createProjects = asyncHandler(async (req, res) => {
  const result = await bulkService.createProjects(req.body.projects, req.user.id);
  successResponse(res, result, 'Projects created successfully');
});

exports.updateProjects = asyncHandler(async (req, res) => {
  const { projectIds, updates } = req.body;
  const result = await bulkService.updateProjects(projectIds, updates);
  successResponse(res, result, 'Projects updated successfully');
});

exports.deleteProjects = asyncHandler(async (req, res) => {
  const { projectIds } = req.body;
  const result = await bulkService.deleteProjects(projectIds);
  successResponse(res, result, 'Projects deleted successfully');
});

exports.archiveProjects = asyncHandler(async (req, res) => {
  const { projectIds } = req.body;
  const result = await bulkService.archiveProjects(projectIds);
  successResponse(res, result, 'Projects archived successfully');
});

exports.importData = asyncHandler(async (req, res) => {
  const result = await bulkService.importData(req.body, req.user.id);
  successResponse(res, result, 'Data imported successfully');
});

exports.importFromCsv = asyncHandler(async (req, res) => {
  const result = await bulkService.importFromCsv(req.body, req.user.id);
  successResponse(res, result, 'CSV data imported successfully');
});

exports.importFromJson = asyncHandler(async (req, res) => {
  const result = await bulkService.importFromJson(req.body, req.user.id);
  successResponse(res, result, 'JSON data imported successfully');
});
