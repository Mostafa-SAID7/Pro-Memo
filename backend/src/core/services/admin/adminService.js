/**
 * Admin Service
 * Business logic for admin operations
 */

const User = require('../../models/user/User');
const Project = require('../../models/project/Project');
const Task = require('../../models/task/Task');
const backup = require('../../../infrastructure/backup/backupService');

class AdminService {
  async getAllUsers(filters = {}) {
    const query = {};
    if (filters.role) query.role = filters.role;
    if (filters.status) query.status = filters.status;
    
    return User.find(query)
      .select('-password')
      .sort({ createdAt: -1 });
  }

  async getUserById(userId) {
    return User.findById(userId).select('-password');
  }

  async deleteUser(userId) {
    return User.findByIdAndDelete(userId);
  }

  async updateUserRole(userId, role) {
    return User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
  }

  async updateUserStatus(userId, status) {
    return User.findByIdAndUpdate(userId, { status }, { new: true }).select('-password');
  }

  async getSystemStats() {
    const [userCount, projectCount, taskCount, completedTasks] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Task.countDocuments(),
      Task.countDocuments({ status: 'done' })
    ]);

    return {
      users: userCount,
      projects: projectCount,
      tasks: taskCount,
      completedTasks,
      completionRate: taskCount > 0 ? Math.round((completedTasks / taskCount) * 100) : 0
    };
  }


  async getUserStats() {
    const stats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    return stats.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {});
  }

  async getProjectStats() {
    const stats = await Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    return stats.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {});
  }

  async getTaskStats() {
    const stats = await Task.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    return stats.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {});
  }

  async createBackup() {
    return backup.createBackup();
  }

  async listBackups() {
    return backup.listBackups();
  }

  async restoreBackup(backupId) {
    return backup.restoreBackup(backupId);
  }

  async getLogs(options = {}) {
    // Return empty array - implement actual logging if needed
    return [];
  }

  async clearLogs() {
    return { cleared: true };
  }

  async getSettings() {
    return {
      maintenance: false,
      registrationEnabled: true,
      maxProjectsPerUser: 50,
      maxTasksPerProject: 500
    };
  }

  async updateSettings(settings) {
    return settings;
  }
}

module.exports = new AdminService();
