/**
 * Application Constants
 */

module.exports = {
  // User roles
  USER_ROLES: {
    USER: 'user',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin'
  },

  // Project statuses
  PROJECT_STATUS: {
    PLANNING: 'planning',
    ACTIVE: 'active',
    ON_HOLD: 'on-hold',
    COMPLETED: 'completed',
    ARCHIVED: 'archived'
  },

  // Task statuses
  TASK_STATUS: {
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    REVIEW: 'review',
    DONE: 'done',
    BLOCKED: 'blocked'
  },

  // Priority levels
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent'
  },

  // Notification types
  NOTIFICATION_TYPES: {
    TASK_ASSIGNED: 'task_assigned',
    TASK_STATUS_CHANGED: 'task_status_changed',
    COMMENT_ADDED: 'comment_added',
    MENTIONED: 'mentioned',
    DEADLINE_REMINDER: 'deadline_reminder',
    PROJECT_INVITATION: 'project_invitation'
  },

  // Activity actions
  ACTIVITY_ACTIONS: {
    PROJECT_CREATED: 'project_created',
    PROJECT_UPDATED: 'project_updated',
    PROJECT_DELETED: 'project_deleted',
    TASK_CREATED: 'task_created',
    TASK_UPDATED: 'task_updated',
    TASK_DELETED: 'task_deleted',
    TASK_STATUS_CHANGED: 'task_status_changed',
    TASK_ASSIGNED: 'task_assigned',
    COMMENT_ADDED: 'comment_added'
  },

  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100
  },

  // Cache TTL (in seconds)
  CACHE_TTL: {
    SHORT: 60,           // 1 minute
    MEDIUM: 300,         // 5 minutes
    LONG: 3600,          // 1 hour
    VERY_LONG: 86400     // 24 hours
  },

  // File upload
  FILE_UPLOAD: {
    MAX_SIZE: 10 * 1024 * 1024,  // 10MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/csv']
  },

  // Rate limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000,  // 15 minutes
    MAX_REQUESTS: 100
  }
};
