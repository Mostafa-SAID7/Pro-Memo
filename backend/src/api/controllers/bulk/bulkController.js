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
