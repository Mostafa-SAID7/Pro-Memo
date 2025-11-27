/**
 * User Controller
 */

const userService = require('../../../core/services/user/userService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

exports.getAllUsers = asyncHandler(async (req, res) => {
  const { data, pagination } = await userService.getAllUsers(req.query);
  successResponse(res, data, 'Users retrieved successfully', pagination);
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  successResponse(res, user, 'User retrieved successfully');
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  successResponse(res, user, 'User updated successfully');
});

exports.deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  successResponse(res, null, 'User deleted successfully');
});

exports.searchUsers = asyncHandler(async (req, res) => {
  const users = await userService.searchUsers(req.query.q || '');
  successResponse(res, users, 'Users found');
});
