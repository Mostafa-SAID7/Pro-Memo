/**
 * Search Routes
 */

const express = require('express');
const router = express.Router();
const { search: searchController } = require('../../../controllers');
const { protect, cache } = require('../../middleware');

// All routes require authentication
router.use(protect);

// Global Search
router.get('/', searchController.globalSearch);
router.get('/advanced', searchController.advancedSearch);

// Entity-specific Search
router.get('/tasks', searchController.searchTasks);
router.get('/projects', searchController.searchProjects);
router.get('/users', searchController.searchUsers);

// Search Helpers
router.get('/suggestions', cache(60), searchController.getSearchSuggestions);
router.get('/recent', searchController.getRecentSearches);
router.delete('/recent', searchController.clearRecentSearches);

module.exports = router;
