/**
 * Notification Service
 * Business logic for notification operations
 */

const Notification = require('../../models/system/Notification');
const { NotFoundError } = require('../../../shared/errors');

class NotificationService {
  async getNotifications(userId, limit = 50) {
    return Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  async getUnreadNotifications(userId) {
    return Notification.find({ user: userId, read: false })
      .sort({ createdAt: -1 });
  }

  async getUnreadCount(userId) {
    return Notification.countDocuments({ user: userId, read: false });
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
