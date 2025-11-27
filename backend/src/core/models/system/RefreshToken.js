/**
 * Refresh Token Model
 */

const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true
  },
  isRevoked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
refreshTokenSchema.index({ token: 1 });
refreshTokenSchema.index({ expiresAt: 1 });

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
