/**
 * System Routes Index
 */

const healthRoutes = require('./health.routes');
const notificationRoutes = require('./notification.routes');
const activityRoutes = require('./activity.routes');

module.exports = {
  healthRoutes,
  notificationRoutes,
  activityRoutes
};
