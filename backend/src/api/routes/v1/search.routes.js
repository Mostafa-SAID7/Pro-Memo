/**
 * Search Routes
 */

const express = require('express');
const router = express.Router();
const { search: searchController } = require('../../controllers');
const { protect, cache } = require('../../../middleware');

// All routes require authentication
router.use(protect);

router.get('/', searchController.globalSearch);
router.get('/tasks', searchController.searchTasks);
router.get('/projects', searchController.searchProjects);
router.get('/suggestions', searchController.getSearchSuggestions);

module.exports = router;
