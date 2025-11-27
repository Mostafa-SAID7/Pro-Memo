/**
 * Admin Controller
 */

const adminService = require('../../../core/services/admin/adminService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

exports.getSystemStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getSystemStats();
  successResponse(res, stats, 'System stats retrieved successfully');
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const { data, pagination } = await adminService.getAllUsers(req.query);
  successResponse(res, data, 'Users retrieved successfully', pagination);
});

exports.updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await adminService.updateUserRole(req.params.userId, role);
  successResponse(res, user, 'User role updated successfully');
});

exports.deleteUser = asyncHandler(async (req, res) => {
  await adminService.deleteUser(req.params.userId);
  successResponse(res, null, 'User deleted successfully');
});

exports.getAuditLogs = asyncHandler(async (req, res) => {
  const { data, pagination } = await adminService.getAuditLogs(req.query);
  successResponse(res, data, 'Audit logs retrieved successfully', pagination);
});
