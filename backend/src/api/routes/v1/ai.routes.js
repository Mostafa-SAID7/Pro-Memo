/**
 * AI Routes
 */

const express = require('express');
const router = express.Router();
const { ai: aiController } = require('../../controllers');
const { protect, strictLimiter } = require('../../../middleware');

// All routes require authentication
router.use(protect);
router.use(strictLimiter); // AI endpoints are rate-limited

router.get('/suggestions', aiController.getSuggestions);
router.post('/analyze-task', aiController.analyzeTask);
router.post('/generate-description', aiController.generateDescription);
router.post('/predict-completion', aiController.predictCompletion);
router.post('/smart-categorize', aiController.smartCategorize);

module.exports = router;
