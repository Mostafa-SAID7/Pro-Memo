/**
 * API v1 Routes
 * Main router for API version 1
 */

const express = require('express');
const router = express.Router();

// Import route modules from subfolders
const { authRoutes, userRoutes } = require('./auth');
const { projectRoutes, taskRoutes } = require('./core');
const { analyticsRoutes } = require('./analytics');
const { aiRoutes } = require('./ai');
const { adminRoutes } = require('./admin');
const { searchRoutes, exportRoutes, bulkRoutes } = require('./operations');
const { healthRoutes, notificationRoutes, activityRoutes } = require('./system');

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    name: 'Pro Memo API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/v1/health',
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      projects: '/api/v1/projects',
      tasks: '/api/v1/tasks',
      analytics: '/api/v1/analytics',
      ai: '/api/v1/ai',
      admin: '/api/v1/admin',
      search: '/api/v1/search',
      export: '/api/v1/export',
      bulk: '/api/v1/bulk',
      activities: '/api/v1/activities',
      notifications: '/api/v1/notifications'
    }
  });
});

// Mount routes
// System routes (public)
router.use('/health', healthRoutes);

// Auth routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

// Core business routes
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

// Analytics routes
router.use('/analytics', analyticsRoutes);

// AI routes
router.use('/ai', aiRoutes);

// Admin routes
router.use('/admin', adminRoutes);

// Operations routes
router.use('/search', searchRoutes);
router.use('/export', exportRoutes);
router.use('/bulk', bulkRoutes);

// System routes (protected)
router.use('/activities', activityRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
