/**
 * Project Routes
 */

const express = require('express');
const router = express.Router();
const { project: projectController } = require('../../../controllers');
const { protect, validators, validate, cache, clearCache } = require('../../../middleware');

// All routes require authentication
router.use(protect);

// Project CRUD
router.get('/', cache(300), projectController.getAllProjects);
router.post('/', validators.createProject, validate, clearCache('projects*'), projectController.createProject);
router.get('/:id', validators.mongoId, validate, cache(300), projectController.getProjectById);
router.put('/:id', validators.mongoId, validators.updateProject, validate, clearCache('projects*'), projectController.updateProject);
router.delete('/:id', validators.mongoId, validate, clearCache('projects*'), projectController.deleteProject);

// Project related data
router.get('/:id/tasks', validators.mongoId, validate, projectController.getProjectTasks);
router.get('/:id/analytics', validators.mongoId, validate, cache(600), projectController.getProjectAnalytics);
router.get('/:id/members', validators.mongoId, validate, projectController.getProjectMembers);
router.post('/:id/members', validators.mongoId, validate, projectController.addProjectMember);
router.delete('/:id/members/:userId', validators.mongoId, validate, projectController.removeProjectMember);

module.exports = router;
