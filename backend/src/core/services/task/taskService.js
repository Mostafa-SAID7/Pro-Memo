/**
 * Task Service
 * Business logic for task operations
 */

const Task = require('../../models/task/Task');
const { NotFoundError, ValidationError } = require('../../../shared/errors');

class TaskService {
  async getAllTasks(userId, filters = {}) {
    const query = { $or: [{ creator: userId }, { assignee: userId }] };
    
    if (filters.projectId) query.project = filters.projectId;
    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;
    
    return Task.find(query)
      .populate('project', 'name')
      .populate('assignee', 'name email')
      .populate('creator', 'name email')
      .sort({ createdAt: -1 });
  }

  async getTaskById(taskId, userId) {
    const task = await Task.findById(taskId)
      .populate('project', 'name')
      .populate('assignee', 'name email')
      .populate('creator', 'name email')
      .populate('comments.user', 'name email');
    
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    
    return task;
  }

  async createTask(taskData, userId) {
    const task = new Task({
      ...taskData,
      creator: userId
    });
    
    await task.save();
    return task.populate(['project', 'assignee', 'creator']);
  }

  async updateTask(taskId, updateData, userId) {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate(['project', 'assignee', 'creator']);
    
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    
    return task;
  }

  async deleteTask(taskId, userId) {
    const task = await Task.findByIdAndDelete(taskId);
    
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    
    return task;
  }

  async updateTaskStatus(taskId, status, userId) {
    return this.updateTask(taskId, { status }, userId);
  }

  async updateTaskPriority(taskId, priority, userId) {
    return this.updateTask(taskId, { priority }, userId);
  }

  async assignTask(taskId, assigneeId, userId) {
    return this.updateTask(taskId, { assignee: assigneeId }, userId);
  }

  async addComment(taskId, comment, userId) {
    const task = await Task.findById(taskId);
    
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    
    task.comments.push({
      user: userId,
      text: comment,
      createdAt: new Date()
    });
    
    await task.save();
    return task.populate('comments.user', 'name email');
  }

  async getComments(taskId) {
    const task = await Task.findById(taskId)
      .select('comments')
      .populate('comments.user', 'name email');
    
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    
    return task.comments;
  }

  async deleteComment(taskId, commentId, userId) {
    const task = await Task.findById(taskId);
    
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    
    task.comments = task.comments.filter(c => c._id.toString() !== commentId);
    await task.save();
    
    return task;
  }

  async getTasksByProject(projectId) {
    return Task.find({ project: projectId })
      .populate('assignee', 'name email')
      .populate('creator', 'name email')
      .sort({ createdAt: -1 });
  }
}

module.exports = new TaskService();
