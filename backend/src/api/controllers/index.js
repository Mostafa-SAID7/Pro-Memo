/**
 * Controllers Index
 * Central export for all controllers
 */

module.exports = {
  auth: require('./auth/authController'),
  project: require('./projects/projectController'),
  task: require('./tasks/taskController'),
  user: require('./users/userController'),
  analytics: require('./analytics/analyticsController'),
  ai: require('./ai/aiController'),
  admin: require('./admin/adminController'),
  search: require('./search/searchController'),
  export: require('./export/exportController'),
  bulk: require('./bulk/bulkController'),
  activity: require('./activities/activityController'),
  notification: require('./notifications/notificationController')
};
