/**
 * Activity Model
 * Tracks user activities in the system
 */

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  action: {
    type: String,
    required: true,
    enum: ['created', 'updated', 'deleted', 'completed', 'commented', 'assigned', 'moved', 'archived', 'restored']
  },
  entityType: {
    type: String,
    required: true,
    enum: ['task', 'project', 'user', 'comment', 'file']
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  entityName: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
activitySchema.index({ user: 1, createdAt: -1 });
activitySchema.index({ entityType: 1, entityId: 1, createdAt: -1 });

module.exports = mongoose.model('Activity', activitySchema);
