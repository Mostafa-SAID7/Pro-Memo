/**
 * Audit Log Model
 */

const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  action: {
    type: String,
    required: true,
    index: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Indexes
auditLogSchema.index({ user: 1, createdAt: -1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ 'metadata.projectId': 1 });
auditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
