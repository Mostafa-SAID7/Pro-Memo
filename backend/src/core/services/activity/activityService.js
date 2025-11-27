/**
 * Activity Service
 * Business logic for activity tracking
 */

const Activity = require('../../models/system/Activity');

class ActivityService {
  // Log an activity
  async logActivity(data) {
    const activity = new Activity({
      user: data.userId,
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      entityName: data.entityName,
      details: data.details,
      metadata: data.metadata
    });
    
    await activity.save();
    return activity;
  }

  // Get activities with pagination
  async getActivities(options = {}) {
    const { page = 1, limit = 50, userId, entityType, action } = options;
    const skip = (page - 1) * limit;
    
    const query = {};
    if (userId) query.user = userId;
    if (entityType) query.entityType = entityType;
    if (action) query.action = action;
    
    const [data, total] = await Promise.all([
      Activity.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('user', 'name email avatar'),
      Activity.countDocuments(query)
    ]);
    
    return {
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get recent activities
  async getRecentActivities(userId, limit = 10) {
    return Activity.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user', 'name email avatar');
  }

  // Get activity feed (includes team activities)
  async getActivityFeed(userId, options = {}) {
    const { limit = 50, projectIds = [] } = options;
    const query = {
      $or: [
        { user: userId },
        { entityType: 'project', entityId: { $in: projectIds } }
      ]
    };
    
    return Activity.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('user', 'name email avatar');
  }

  // Get activities for a specific user
  async getUserActivities(targetUserId, options = {}) {
    const { limit = 50 } = options;
    return Activity.find({ user: targetUserId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('user', 'name email avatar');
  }

  // Get activities for a project
  async getProjectActivities(projectId, options = {}) {
    const { limit = 50 } = options;
    return Activity.find({ 
      $or: [
        { entityType: 'project', entityId: projectId },
        { 'metadata.projectId': projectId }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('user', 'name email avatar');
  }

  // Get activities for a task
  async getTaskActivities(taskId, options = {}) {
    const { limit = 50 } = options;
    return Activity.find({ 
      entityType: 'task', 
      entityId: taskId 
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('user', 'name email avatar');
  }

  // Get activity stats
  async getActivityStats(userId, options = {}) {
    const { days = 30 } = options;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    
    const activities = await Activity.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 }
        }
      }
    ]);

    const stats = {};
    activities.forEach(a => {
      stats[a._id] = a.count;
    });

    return {
      totalActivities: Object.values(stats).reduce((a, b) => a + b, 0),
      byAction: stats,
      period: `${days} days`
    };
  }

  // Get activity timeline (alias for getTimeline)
  async getActivityTimeline(options = {}) {
    return this.getTimeline(options);
  }

  // Get timeline
  async getTimeline(options = {}) {
    const { days = 7, userId } = options;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    
    const matchStage = { createdAt: { $gte: startDate } };
    if (userId) matchStage.user = userId;
    
    const activities = await Activity.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 },
          activities: { $push: { action: '$action', entityType: '$entityType' } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return activities;
  }

  // Activity logging helpers
  async logTaskCreated(userId, task) {
    return this.logActivity({
      userId,
      action: 'created',
      entityType: 'task',
      entityId: task._id,
      entityName: task.title,
      details: `Created task "${task.title}"`
    });
  }

  async logTaskUpdated(userId, task, changes) {
    return this.logActivity({
      userId,
      action: 'updated',
      entityType: 'task',
      entityId: task._id,
      entityName: task.title,
      details: `Updated task "${task.title}"`,
      metadata: { changes }
    });
  }

  async logTaskCompleted(userId, task) {
    return this.logActivity({
      userId,
      action: 'completed',
      entityType: 'task',
      entityId: task._id,
      entityName: task.title,
      details: `Completed task "${task.title}"`
    });
  }

  async logProjectCreated(userId, project) {
    return this.logActivity({
      userId,
      action: 'created',
      entityType: 'project',
      entityId: project._id,
      entityName: project.name,
      details: `Created project "${project.name}"`
    });
  }

  async logCommentAdded(userId, task, comment) {
    return this.logActivity({
      userId,
      action: 'commented',
      entityType: 'task',
      entityId: task._id,
      entityName: task.title,
      details: `Commented on task "${task.title}"`,
      metadata: { commentPreview: comment.substring(0, 50) }
    });
  }
}

module.exports = new ActivityService();
