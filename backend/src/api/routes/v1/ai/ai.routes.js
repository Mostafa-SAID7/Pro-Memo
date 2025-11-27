/**
 * AI Routes
 */

const express = require('express');
const router = express.Router();
const { ai: aiController } = require('../../../controllers');
const { protect, strictLimiter } = require('../../../middleware');

// All routes require authentication
router.use(protect);
router.use(strictLimiter); // AI endpoints are rate-limited

// Suggestions
router.get('/suggestions', aiController.getSuggestions);
router.get('/suggestions/task/:taskId', aiController.getTaskSuggestions);
router.get('/suggestions/project/:projectId', aiController.getProjectSuggestions);

// Analysis
router.post('/analyze-task', aiController.analyzeTask);
router.post('/analyze-project', aiController.analyzeProject);

// Generation
router.post('/generate-description', aiController.generateDescription);
router.post('/generate-subtasks', aiController.generateSubtasks);

// Predictions
router.post('/predict-completion', aiController.predictCompletion);
router.post('/predict-risk', aiController.predictRisk);

// Categorization
router.post('/smart-categorize', aiController.smartCategorize);
router.post('/auto-tag', aiController.autoTag);

module.exports = router;
