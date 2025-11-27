/**
 * Notification Model
 */

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['task_assigned', 'task_status_changed', 'comment_added', 'mentioned', 'deadline_reminder', 'project_invitation'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  metadata: {
    taskId: mongoose.Schema.Types.ObjectId,
    projectId: mongoose.Schema.Types.ObjectId,
    commentId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId
  }
}, {
  timestamps: true
});

// Indexes
notificationSchema.index({ user: 1, read: 1 });
notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
