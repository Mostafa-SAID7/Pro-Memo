/**
 * Services Index
 * Central export for all services
 */

module.exports = {
  authService: require('./auth/authService'),
  projectService: require('./project/projectService'),
  taskService: require('./task/taskService'),
  userService: require('./user/userService'),
  notificationService: require('./notification/notificationService'),
  analyticsService: require('./analytics/analyticsService'),
  searchService: require('./search/searchService'),
  aiService: require('./ai/aiService'),
  activityService: require('./activity/activityService'),
  adminService: require('./admin/adminService'),
  exportService: require('./export/exportService'),
  bulkService: require('./bulk/bulkService')
};
