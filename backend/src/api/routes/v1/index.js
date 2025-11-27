/**
 * API v1 Routes
 * Main router for API version 1
 */

const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const projectRoutes = require('./project.routes');
const taskRoutes = require('./task.routes');
const analyticsRoutes = require('./analytics.routes');
const aiRoutes = require('./ai.routes');
const adminRoutes = require('./admin.routes');
const searchRoutes = require('./search.routes');
const exportRoutes = require('./export.routes');
const bulkRoutes = require('./bulk.routes');
const activityRoutes = require('./activity.routes');
const notificationRoutes = require('./notification.routes');
const healthRoutes = require('./health.routes');

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
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/ai', aiRoutes);
router.use('/admin', adminRoutes);
router.use('/search', searchRoutes);
router.use('/export', exportRoutes);
router.use('/bulk', bulkRoutes);
router.use('/activities', activityRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
