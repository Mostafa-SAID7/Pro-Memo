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
    const now = new Date();
    const days = period === 'monthly' ? 30 : period === 'weekly' ? 7 : 7;
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const tasks = await Task.aggregate([
      {
        $match: {
          $or: [{ creator: userId }, { assignee: userId }],
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          created: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return {
      [period]: tasks.map(t => ({
        date: t._id,
        created: t.created,
        completed: t.completed
      }))
    };
  }

  async getUserAnalytics(userId, options = {}) {
    const { startDate, endDate } = options;
    
    const matchQuery = { $or: [{ creator: userId }, { assignee: userId }] };
    if (startDate) matchQuery.createdAt = { $gte: new Date(startDate) };
    if (endDate) {
      matchQuery.createdAt = matchQuery.createdAt || {};
      matchQuery.createdAt.$lte = new Date(endDate);
    }

    const [tasksByStatus, tasksByProject, completionTrend] = await Promise.all([
      Task.aggregate([
        { $match: matchQuery },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Task.aggregate([
        { $match: matchQuery },
        { $lookup: { from: 'projects', localField: 'project', foreignField: '_id', as: 'projectInfo' } },
        { $unwind: { path: '$projectInfo', preserveNullAndEmptyArrays: true } },
        { $group: { _id: '$projectInfo.name', count: { $sum: 1 } } }
      ]),
      Task.aggregate([
        { $match: { ...matchQuery, status: 'done' } },
        { $group: { 
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
          count: { $sum: 1 }
        }},
        { $sort: { _id: -1 } },
        { $limit: 7 }
      ])
    ]);

    const statusMap = {};
    tasksByStatus.forEach(s => statusMap[s._id] = s.count);

    const projectMap = {};
    tasksByProject.forEach(p => projectMap[p._id || 'Unassigned'] = p.count);

    const trendMap = {};
    completionTrend.forEach(t => trendMap[t._id] = t.count);

    const total = Object.values(statusMap).reduce((a, b) => a + b, 0);
    const completed = statusMap['done'] || 0;
    const inProgress = statusMap['in-progress'] || 0;

    return {
      tasksByStatus: statusMap,
      tasksByProject: projectMap,
      completionTrend: trendMap,
      summary: {
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        inProgressTasks: inProgress,
        avgCompletionTime: 3.5 // Placeholder
      }
    };
  }

  async getDashboardOverview(userId) {
    const stats = await this.getDashboardStats(userId);
    const productivity = await this.getProductivityMetrics(userId);
    
    return {
      metrics: {
        totalProjects: stats.totalProjects,
        totalTasks: stats.totalTasks,
        completedTasks: stats.completedTasks,
        inProgressTasks: stats.pendingTasks,
        overdueTasks: stats.overdueTasks,
        upcomingDeadlines: 0
      },
      productivity
    };
  }

  async getTeamAnalytics(projectId, userId) {
    const project = await Project.findById(projectId).populate('members.user', 'name email');
    if (!project) return null;

    const memberStats = await Promise.all(
      project.members.map(async (member) => {
        const tasks = await Task.countDocuments({ project: projectId, assignee: member.user._id });
        const completed = await Task.countDocuments({ project: projectId, assignee: member.user._id, status: 'done' });
        return {
          user: member.user,
          role: member.role,
          totalTasks: tasks,
          completedTasks: completed,
          completionRate: tasks > 0 ? Math.round((completed / tasks) * 100) : 0
        };
      })
    );

    return { members: memberStats };
  }
}

module.exports = new AnalyticsService();
