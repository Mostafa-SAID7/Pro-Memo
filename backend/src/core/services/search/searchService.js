/**
 * Search Service
 * Business logic for search operations
 */

const Task = require('../../models/task/Task');
const Project = require('../../models/project/Project');
const User = require('../../models/user/User');

class SearchService {
  // Global search across all entities
  async globalSearch(userId, query, options = {}) {
    const { type, limit = 20 } = options;
    const results = [];
    const searchRegex = new RegExp(query, 'i');

    if (!type || type === 'task') {
      const tasks = await Task.find({
        $or: [{ creator: userId }, { assignee: userId }],
        $and: [
          { $or: [
            { title: searchRegex },
            { description: searchRegex },
            { tags: searchRegex }
          ]}
        ]
      })
      .populate('project', 'name')
      .limit(limit)
      .lean();

      tasks.forEach(task => {
        results.push({
          type: 'task',
          id: task._id,
          title: task.title,
          description: task.description?.substring(0, 100),
          relevance: this.calculateRelevance(query, task.title, task.description),
          metadata: { status: task.status, priority: task.priority, project: task.project?.name }
        });
      });
    }

    if (!type || type === 'project') {
      const projects = await Project.find({
        $or: [{ owner: userId }, { 'members.user': userId }],
        $and: [
          { $or: [
            { name: searchRegex },
            { description: searchRegex },
            { tags: searchRegex }
          ]}
        ]
      })
      .limit(limit)
      .lean();

      projects.forEach(project => {
        results.push({
          type: 'project',
          id: project._id,
          title: project.name,
          description: project.description?.substring(0, 100),
          relevance: this.calculateRelevance(query, project.name, project.description),
          metadata: { status: project.status, priority: project.priority }
        });
      });
    }

    if (!type || type === 'user') {
      const users = await User.find({
        $or: [
          { name: searchRegex },
          { email: searchRegex }
        ]
      })
      .select('name email avatar')
      .limit(limit)
      .lean();

      users.forEach(user => {
        results.push({
          type: 'user',
          id: user._id,
          title: user.name,
          description: user.email,
          relevance: this.calculateRelevance(query, user.name, user.email),
          metadata: {}
        });
      });
    }

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);
    return results.slice(0, limit);
  }

  // Search tasks
  async searchTasks(userId, query, filters = {}) {
    const searchRegex = new RegExp(query, 'i');
    const matchQuery = {
      $or: [{ creator: userId }, { assignee: userId }],
      $and: [
        { $or: [
          { title: searchRegex },
          { description: searchRegex },
          { tags: searchRegex }
        ]}
      ]
    };

    if (filters.projectId) matchQuery.project = filters.projectId;
    if (filters.status) matchQuery.status = filters.status;
    if (filters.priority) matchQuery.priority = filters.priority;

    return Task.find(matchQuery)
      .populate('project', 'name')
      .populate('assignee', 'name email')
      .sort({ updatedAt: -1 })
      .limit(50);
  }

  // Search projects
  async searchProjects(userId, query) {
    const searchRegex = new RegExp(query, 'i');
    
    return Project.find({
      $or: [{ owner: userId }, { 'members.user': userId }],
      $and: [
        { $or: [
          { name: searchRegex },
          { description: searchRegex },
          { tags: searchRegex }
        ]}
      ]
    })
    .populate('owner', 'name email')
    .sort({ updatedAt: -1 })
    .limit(20);
  }

  // Search users
  async searchUsers(query) {
    const searchRegex = new RegExp(query, 'i');
    
    return User.find({
      $or: [
        { name: searchRegex },
        { email: searchRegex }
      ]
    })
    .select('name email avatar')
    .limit(10);
  }

  // Get search suggestions
  async getSearchSuggestions(userId, query) {
    const suggestions = new Set();
    const searchRegex = new RegExp(query, 'i');

    // Get matching task titles
    const tasks = await Task.find({
      $or: [{ creator: userId }, { assignee: userId }],
      title: searchRegex
    })
    .select('title')
    .limit(5);
    
    tasks.forEach(t => suggestions.add(t.title));

    // Get matching project names
    const projects = await Project.find({
      $or: [{ owner: userId }, { 'members.user': userId }],
      name: searchRegex
    })
    .select('name')
    .limit(5);
    
    projects.forEach(p => suggestions.add(p.name));

    // Get matching tags
    const tasksWithTags = await Task.find({
      $or: [{ creator: userId }, { assignee: userId }],
      tags: searchRegex
    })
    .select('tags')
    .limit(10);
    
    tasksWithTags.forEach(t => {
      t.tags?.forEach(tag => {
        if (tag.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(tag);
        }
      });
    });

    return Array.from(suggestions).slice(0, 10);
  }

  // Calculate search relevance score
  calculateRelevance(query, title, description = '') {
    const queryLower = query.toLowerCase();
    const titleLower = (title || '').toLowerCase();
    const descLower = (description || '').toLowerCase();
    
    let score = 0;
    
    // Exact match in title
    if (titleLower === queryLower) score += 100;
    // Title starts with query
    else if (titleLower.startsWith(queryLower)) score += 80;
    // Title contains query
    else if (titleLower.includes(queryLower)) score += 60;
    
    // Description contains query
    if (descLower.includes(queryLower)) score += 30;
    
    // Word match bonus
    const queryWords = queryLower.split(/\s+/);
    queryWords.forEach(word => {
      if (titleLower.includes(word)) score += 10;
      if (descLower.includes(word)) score += 5;
    });
    
    return score;
  }

  // Advanced search with filters
  async advancedSearch(userId, options) {
    const {
      query,
      types = ['task', 'project'],
      status,
      priority,
      dateFrom,
      dateTo,
      tags,
      limit = 50
    } = options;

    const results = [];
    const searchRegex = query ? new RegExp(query, 'i') : null;

    if (types.includes('task')) {
      const taskQuery = { $or: [{ creator: userId }, { assignee: userId }] };
      
      if (searchRegex) {
        taskQuery.$and = [{ $or: [
          { title: searchRegex },
          { description: searchRegex }
        ]}];
      }
      if (status) taskQuery.status = status;
      if (priority) taskQuery.priority = priority;
      if (dateFrom || dateTo) {
        taskQuery.createdAt = {};
        if (dateFrom) taskQuery.createdAt.$gte = new Date(dateFrom);
        if (dateTo) taskQuery.createdAt.$lte = new Date(dateTo);
      }
      if (tags?.length) taskQuery.tags = { $in: tags };

      const tasks = await Task.find(taskQuery)
        .populate('project', 'name')
        .limit(limit)
        .lean();

      tasks.forEach(task => {
        results.push({
          type: 'task',
          id: task._id,
          title: task.title,
          description: task.description?.substring(0, 100),
          relevance: query ? this.calculateRelevance(query, task.title, task.description) : 50,
          metadata: { status: task.status, priority: task.priority }
        });
      });
    }

    if (types.includes('project')) {
      const projectQuery = { $or: [{ owner: userId }, { 'members.user': userId }] };
      
      if (searchRegex) {
        projectQuery.$and = [{ $or: [
          { name: searchRegex },
          { description: searchRegex }
        ]}];
      }
      if (status) projectQuery.status = status;
      if (priority) projectQuery.priority = priority;

      const projects = await Project.find(projectQuery)
        .limit(limit)
        .lean();

      projects.forEach(project => {
        results.push({
          type: 'project',
          id: project._id,
          title: project.name,
          description: project.description?.substring(0, 100),
          relevance: query ? this.calculateRelevance(query, project.name, project.description) : 50,
          metadata: { status: project.status }
        });
      });
    }

    results.sort((a, b) => b.relevance - a.relevance);
    return results.slice(0, limit);
  }
}

module.exports = new SearchService();
