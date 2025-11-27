/**
 * Analytics Service
 * Business logic for analytics operations
 */

const Task = require('../../models/task/Task');
const Project = require('../../models/project/Project');
const User = require('../../models/user/User');

class AnalyticsService {
  async getDashboardStats(userId) {
    const [totalProjects, totalTasks, completedTasks, pendingTasks, overdueTasks] = await Promise.all([
      Project.countDocuments({ $or: [{ owner: userId }, { 'members.user': userId }] }),
      Task.countDocuments({ $or: [{ creator: userId }, { assignee: userId }] }),
      Task.countDocuments({ $or: [{ creator: userId }, { assignee: userId }], status: 'done' }),
      Task.countDocuments({ $or: [{ creator: userId }, { assignee: userId }], status: { $in: ['todo', 'in-progress'] } }),
      Task.countDocuments({ 
        $or: [{ creator: userId }, { assignee: userId }], 
        dueDate: { $lt: new Date() },
        status: { $ne: 'done' }
      })
    ]);

    const productivity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      productivity
    };
  }

  async getTaskAnalytics(userId, filters = {}) {
    const matchQuery = { $or: [{ creator: userId }, { assignee: userId }] };
    
    if (filters.projectId) matchQuery.project = filters.projectId;
    if (filters.startDate) matchQuery.createdAt = { $gte: new Date(filters.startDate) };
    if (filters.endDate) {
      matchQuery.createdAt = matchQuery.createdAt || {};
      matchQuery.createdAt.$lte = new Date(filters.endDate);
    }

    const [byStatus, byPriority, completionStats] = await Promise.all([
      Task.aggregate([
        { $match: matchQuery },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Task.aggregate([
        { $match: matchQuery },
        { $group: { _id: '$priority', count: { $sum: 1 } } }
      ]),
      Task.aggregate([
        { $match: { ...matchQuery, status: 'done' } },
        { $group: { 
          _id: null, 
          avgCompletionTime: { $avg: { $subtract: ['$updatedAt', '$createdAt'] } }
        }}
      ])
    ]);

    const statusMap = {};
    byStatus.forEach(s => statusMap[s._id] = s.count);

    const priorityMap = {};
    byPriority.forEach(p => priorityMap[p._id] = p.count);

    const total = Object.values(statusMap).reduce((a, b) => a + b, 0);
    const completed = statusMap['done'] || 0;

    return {
      byStatus: statusMap,
      byPriority: priorityMap,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      averageCompletionTime: completionStats[0]?.avgCompletionTime || 0
    };
  }

  async getProjectAnalytics(userId) {
    const projects = await Project.find({ 
      $or: [{ owner: userId }, { 'members.user': userId }] 
    });

    const byStatus = {};
    projects.forEach(p => {
      byStatus[p.status] = (byStatus[p.status] || 0) + 1;
    });

    const taskDistribution = await Promise.all(
      projects.slice(0, 10).map(async (project) => {
        const taskCount = await Task.countDocuments({ project: project._id });
        return { projectName: project.name, taskCount };
      })
    );

    const completed = byStatus['completed'] || 0;
    const total = projects.length;

    return {
      byStatus,
      taskDistribution,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }

  async getProductivityMetrics(userId) {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [today, thisWeek, thisMonth] = await Promise.all([
      Task.countDocuments({
        $or: [{ creator: userId }, { assignee: userId }],
        status: 'done',
        updatedAt: { $gte: startOfDay }
      }),
      Task.countDocuments({
        $or: [{ creator: userId }, { assignee: userId }],
        status: 'done',
        updatedAt: { $gte: startOfWeek }
      }),
      Task.countDocuments({
        $or: [{ creator: userId }, { assignee: userId }],
        status: 'done',
        updatedAt: { $gte: startOfMonth }
      })
    ]);

    const daysInMonth = new Date().getDate();
    const averageTasksPerDay = daysInMonth > 0 ? Math.round(thisMonth / daysInMonth * 10) / 10 : 0;

    return {
      tasksCompletedToday: today,
      tasksCompletedThisWeek: thisWeek,
      tasksCompletedThisMonth: thisMonth,
      averageTasksPerDay,
      productivityTrend: thisWeek > (thisMonth / 4) ? 'up' : thisWeek < (thisMonth / 4) ? 'down' : 'stable'
    };
  }

  async getTrends(userId, period = 'daily') {
    // Simplified trends - returns mock data structure
    return {
      daily: [],
      weekly: [],
      monthly: []
    };
  }
}

module.exports = new AnalyticsService();
