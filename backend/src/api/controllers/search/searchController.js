/**
 * Search Controller
 */

const searchService = require('../../../core/services/search/searchService');
const asyncHandler = require('../../../shared/utils/helpers/asyncHandler');
const { successResponse } = require('../../../shared/utils/helpers/response');

exports.globalSearch = asyncHandler(async (req, res) => {
  const { q, type, limit } = req.query;
  const results = await searchService.globalSearch(q, req.user.id, { type, limit: parseInt(limit) || 20 });
  successResponse(res, results, 'Search completed successfully');
});

exports.searchProjects = asyncHandler(async (req, res) => {
  const results = await searchService.searchProjects(req.user.id, req.query);
  successResponse(res, results.data, 'Projects retrieved successfully', results.pagination);
});

exports.searchTasks = asyncHandler(async (req, res) => {
  const results = await searchService.searchTasks(req.user.id, req.query);
  successResponse(res, results.data, 'Tasks retrieved successfully', results.pagination);
});

exports.getSearchSuggestions = asyncHandler(async (req, res) => {
  const { q, limit } = req.query;
  const suggestions = await searchService.getSearchSuggestions(q, req.user.id, parseInt(limit) || 5);
  successResponse(res, suggestions, 'Suggestions retrieved successfully');
});

exports.advancedSearch = asyncHandler(async (req, res) => {
  const results = await searchService.advancedSearch(req.user.id, req.query);
  successResponse(res, results, 'Advanced search completed successfully');
});

exports.searchUsers = asyncHandler(async (req, res) => {
  const results = await searchService.searchUsers(req.query.q || '');
  successResponse(res, results, 'Users found successfully');
});

exports.getRecentSearches = asyncHandler(async (req, res) => {
  successResponse(res, [], 'Recent searches retrieved successfully');
});

exports.clearRecentSearches = asyncHandler(async (req, res) => {
  successResponse(res, null, 'Recent searches cleared successfully');
});
