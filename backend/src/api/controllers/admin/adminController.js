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

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await adminService.getUserById(req.params.id);
  successResponse(res, user, 'User retrieved successfully');
});

exports.updateUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const user = await adminService.updateUserStatus(req.params.id, status);
  successResponse(res, user, 'User status updated successfully');
});

exports.getUserStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getUserStats();
  successResponse(res, stats, 'User stats retrieved successfully');
});

exports.getProjectStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getProjectStats();
  successResponse(res, stats, 'Project stats retrieved successfully');
});

exports.getTaskStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getTaskStats();
  successResponse(res, stats, 'Task stats retrieved successfully');
});

exports.createBackup = asyncHandler(async (req, res) => {
  const backup = await adminService.createBackup();
  successResponse(res, backup, 'Backup created successfully');
});

exports.listBackups = asyncHandler(async (req, res) => {
  const backups = await adminService.listBackups();
  successResponse(res, backups, 'Backups retrieved successfully');
});

exports.restoreBackup = asyncHandler(async (req, res) => {
  await adminService.restoreBackup(req.params.backupId);
  successResponse(res, null, 'Backup restored successfully');
});

exports.getLogs = asyncHandler(async (req, res) => {
  const logs = await adminService.getLogs(req.query);
  successResponse(res, logs, 'Logs retrieved successfully');
});

exports.clearLogs = asyncHandler(async (req, res) => {
  await adminService.clearLogs();
  successResponse(res, null, 'Logs cleared successfully');
});

exports.getSettings = asyncHandler(async (req, res) => {
  const settings = await adminService.getSettings();
  successResponse(res, settings, 'Settings retrieved successfully');
});

exports.updateSettings = asyncHandler(async (req, res) => {
  const settings = await adminService.updateSettings(req.body);
  successResponse(res, settings, 'Settings updated successfully');
});
