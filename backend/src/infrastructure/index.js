/**
 * Infrastructure Index
 * Central export for all infrastructure services
 */

module.exports = {
  // Database
  database: {
    connection: require('./database/mongodb/connection'),
    migrations: require('./database/migrations/runner')
  },

  // Cache
  cache: require('./cache/redis/client'),

  // Email
  email: {
    config: require('./email/config'),
    templates: require('./email/templates/emailTemplates')
  },

  // Storage
  storage: require('./storage/fileUpload'),

  // WebSocket
  websocket: require('./websocket/server'),

  // Backup
  backup: require('./backup/backupService'),

  // Scheduler
  scheduler: require('./scheduler/scheduler')
};
