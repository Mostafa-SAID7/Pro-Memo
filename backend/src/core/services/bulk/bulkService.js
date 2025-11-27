/**
 * Bulk Service
 * Business logic for bulk operations
 */

const Task = require('../../models/task/Task');
const Project = require('../../models/project/Project');

class BulkService {
  async createTasks(tasksData, userId) {
    const tasks = tasksData.map(t => ({ ...t, creator: userId }));
    return Task.insertMany(tasks);
  }

  async updateTasks(taskIds, updateData) {
    return Task.updateMany(
      { _id: { $in: taskIds } },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
  }

  async deleteTasks(taskIds) {
    return Task.deleteMany({ _id: { $in: taskIds } });
  }

  async updateTasksStatus(taskIds, status) {
    return Task.updateMany(
      { _id: { $in: taskIds } },
      { $set: { status, updatedAt: new Date() } }
    );
  }

  async updateTasksPriority(taskIds, priority) {
    return Task.updateMany(
      { _id: { $in: taskIds } },
      { $set: { priority, updatedAt: new Date() } }
    );
  }

  async assignTasks(taskIds, assigneeId) {
    return Task.updateMany(
      { _id: { $in: taskIds } },
      { $set: { assignee: assigneeId, updatedAt: new Date() } }
    );
  }

  async moveTasks(taskIds, projectId) {
    return Task.updateMany(
      { _id: { $in: taskIds } },
      { $set: { project: projectId, updatedAt: new Date() } }
    );
  }

  async createProjects(projectsData, userId) {
    const projects = projectsData.map(p => ({ ...p, owner: userId }));
    return Project.insertMany(projects);
  }

  async updateProjects(projectIds, updateData) {
    return Project.updateMany(
      { _id: { $in: projectIds } },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
  }

  async deleteProjects(projectIds) {
    await Task.deleteMany({ project: { $in: projectIds } });
    return Project.deleteMany({ _id: { $in: projectIds } });
  }

  async archiveProjects(projectIds) {
    return Project.updateMany(
      { _id: { $in: projectIds } },
      { $set: { status: 'archived', updatedAt: new Date() } }
    );
  }

  async importData(data, userId) {
    const results = { tasks: 0, projects: 0 };
    
    if (data.projects?.length) {
      const projects = await this.createProjects(data.projects, userId);
      results.projects = projects.length;
    }
    
    if (data.tasks?.length) {
      const tasks = await this.createTasks(data.tasks, userId);
      results.tasks = tasks.length;
    }
    
    return results;
  }

  async importFromCsv(csvData, userId) {
    return this.importData(csvData, userId);
  }

  async importFromJson(jsonData, userId) {
    return this.importData(jsonData, userId);
  }
}

module.exports = new BulkService();
