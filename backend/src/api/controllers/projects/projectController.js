/**
 * Project Controller
 * Handles project CRUD operations
 */

const projectService = require('../../../core/services/project/projectService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

// Create project
exports.createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.user.id, req.body);
  
  successResponse(res, project, 'Project created successfully', null, 201);
});

// Get all projects
exports.getProjects = asyncHandler(async (req, res) => {
  const { data, pagination } = await projectService.getProjects(req.user.id, req.query);
  
  successResponse(res, data, 'Projects retrieved successfully', pagination);
});

// Get project by ID
exports.getProjectById = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id, req.user.id);
  
  successResponse(res, project, 'Project retrieved successfully');
});

// Update project
exports.updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.user.id, req.body);
  
  successResponse(res, project, 'Project updated successfully');
});

// Delete project
exports.deleteProject = asyncHandler(async (req, res) => {
  await projectService.deleteProject(req.params.id, req.user.id);
  
  successResponse(res, null, 'Project deleted successfully');
});

// Add member to project
exports.addMember = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  const project = await projectService.addMember(req.params.id, req.user.id, userId, role);
  
  successResponse(res, project, 'Member added successfully');
});

// Remove member from project
exports.removeMember = asyncHandler(async (req, res) => {
  const project = await projectService.removeMember(req.params.id, req.user.id, req.params.memberId);
  
  successResponse(res, project, 'Member removed successfully');
});

// Update member role
exports.updateMemberRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const project = await projectService.updateMemberRole(req.params.id, req.user.id, req.params.memberId, role);
  
  successResponse(res, project, 'Member role updated successfully');
});
