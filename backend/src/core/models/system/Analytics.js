const mongoose = require('mongoose');

// Visitor Schema
const visitorSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  firstSeen: {
    type: Date,
    default: Date.now
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  isReturning: {
    type: Boolean,
    default: false
  },
  totalSessions: {
    type: Number,
    default: 1
  },
  totalPageViews: {
    type: Number,
    default: 0
  },
  totalDuration: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Session Schema
const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  visitorId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number,
    default: 0
  },
  pageViews: {
    type: Number,
    default: 0
  },
  bounced: {
    type: Boolean,
    default: false
  },
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  utmTerm: String,
  utmContent: String
}, {
  timestamps: true
});

// Page View Schema
const pageViewSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  visitorId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  page: {
    type: String,
    required: true
  },
  device: {
    type: String,
    browser: String,
    os: String,
    screenSize: String
  },
  location: {
    country: String,
    city: String,
    ip: String
  },
  duration: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Event Schema
const eventSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  visitorId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  action: {
    type: String,
    required: true,
    index: true
  },
  label: String,
  value: Number,
  metadata: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
visitorSchema.index({ userId: 1 });
visitorSchema.index({ lastSeen: -1 });

sessionSchema.index({ userId: 1 });
sessionSchema.index({ startTime: -1 });

pageViewSchema.index({ userId: 1 });
pageViewSchema.index({ timestamp: -1 });

eventSchema.index({ userId: 1 });
eventSchema.index({ timestamp: -1 });
eventSchema.index({ category: 1, action: 1 });

const Visitor = mongoose.model('Visitor', visitorSchema);
const Session = mongoose.model('Session', sessionSchema);
const PageView = mongoose.model('PageView', pageViewSchema);
const Event = mongoose.model('Event', eventSchema);

module.exports = {
  Visitor,
  Session,
  PageView,
  Event
};
