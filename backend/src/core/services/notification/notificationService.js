/**
 * Notification Service
 * Business logic for notification operations
 */

const Notification = require('../../models/system/Notification');
const { NotFoundError } = require('../../../shared/errors');

class NotificationService {
  async getNotifications(userId, options = {}) {
    const { page = 1, limit = 50, read } = options;
    const skip = (page - 1) * limit;
    
    const query = { user: userId };
    if (read !== undefined) {
      query.read = read;
    }
    
    const [data, total] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Notification.countDocuments(query)
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

  async getUnreadNotifications(userId) {
    return Notification.find({ user: userId, read: false })
      .sort({ createdAt: -1 });
  }

  async getUnreadCount(userId) {
    return Notification.countDocuments({ user: userId, read: false });
  }

  async getPreferences(userId) {
    // Return default preferences - can be extended with a UserPreferences model
    return {
      email: true,
      push: true,
      taskAssigned: true,
      taskCompleted: true,
      taskDueSoon: true,
      projectUpdates: true,
      mentions: true
    };
  }

  async updatePreferences(userId, preferences) {
    // Store preferences - can be extended with a UserPreferences model
    return {
      ...preferences,
      updatedAt: new Date()
    };
  }

  async createNotification(data) {
    const notification = new Notification(data);
    await notification.save();
    return notification;
  }

  async markAsRead(notificationId, userId) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { read: true },
      { new: true }
    );
    
    if (!notification) {
      throw new NotFoundError('Notification not found');
    }
    
    return notification;
  }

  async markAllAsRead(userId) {
    await Notification.updateMany(
      { user: userId, read: false },
      { read: true }
    );
  }

  async deleteNotification(notificationId, userId) {
    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      user: userId
    });
    
    if (!notification) {
      throw new NotFoundError('Notification not found');
    }
    
    return notification;
  }

  async clearAllNotifications(userId) {
    await Notification.deleteMany({ user: userId });
  }

  // Notification creation helpers
  async notifyTaskAssigned(task, assigneeId) {
    return this.createNotification({
      user: assigneeId,
      type: 'info',
      title: 'Task Assigned',
      message: `You have been assigned to task: ${task.title}`,
      link: `/tasks/${task._id}`
    });
  }

  async notifyTaskCompleted(task, userId) {
    return this.createNotification({
      user: userId,
      type: 'success',
      title: 'Task Completed',
      message: `Task "${task.title}" has been completed`,
      link: `/tasks/${task._id}`
    });
  }

  async notifyTaskDueSoon(task, userId) {
    return this.createNotification({
      user: userId,
      type: 'warning',
      title: 'Task Due Soon',
      message: `Task "${task.title}" is due soon`,
      link: `/tasks/${task._id}`
    });
  }

  async notifyProjectUpdate(project, userId, message) {
    return this.createNotification({
      user: userId,
      type: 'info',
      title: 'Project Update',
      message: message || `Project "${project.name}" has been updated`,
      link: `/projects/${project._id}`
    });
  }
}

module.exports = new NotificationService();
