/**
 * Services Index
 * Central export for all services
 */

module.exports = {
  auth: require('./auth/authService'),
  project: require('./project/projectService'),
  task: require('./task/taskService'),
  user: require('./user/userService'),
  analytics: require('./analytics/analyticsService'),
  ai: require('./ai/aiService'),
  admin: require('./admin/adminService'),
  search: require('./search/searchService'),
  export: require('./export/exportService'),
  bulk: require('./bulk/bulkService'),
  activity: require('./activity/activityService'),
  notification: require('./notification/notificationService')
};
