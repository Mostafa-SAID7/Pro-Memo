/**
 * Project Service
 * Business logic for projects
 */

const Project = require('../../models/project/Project');
const { NotFoundError, ForbiddenError } = require('../../../shared/errors');

class ProjectService {
  async createProject(userId, data) {
    const project = await Project.create({
      ...data,
      owner: userId
    });

    return project.populate('owner', 'name email');
  }

  async getProjects(userId, filters = {}) {
    const { page = 1, limit = 20, status, priority, search } = filters;
    
    const query = {
      $or: [
        { owner: userId },
        { 'members.user': userId }
      ]
    };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { name: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') }
        ]
      });
    }

    const skip = (page - 1) * limit;
    const [projects, total] = await Promise.all([
      Project.find(query)
        .populate('owner', 'name email')
        .populate('members.user', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Project.countDocuments(query)
    ]);

    return {
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getProjectById(projectId, userId) {
    const project = await Project.findById(projectId)
      .populate('owner', 'name email')
      .populate('members.user', 'name email');

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    // Check access
    const hasAccess = project.owner._id.toString() === userId ||
      project.members.some(m => m.user._id.toString() === userId);

    if (!hasAccess) {
      throw new ForbiddenError('Access denied');
    }

    return project;
  }

  async updateProject(projectId, userId, updates) {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (project.owner.toString() !== userId) {
      throw new ForbiddenError('Only owner can update project');
    }

    Object.assign(project, updates);
    await project.save();

    return project.populate('owner', 'name email');
  }

  async deleteProject(projectId, userId) {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (project.owner.toString() !== userId) {
      throw new ForbiddenError('Only owner can delete project');
    }

    await project.deleteOne();
  }

  async addMember(projectId, ownerId, userId, role = 'member') {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (project.owner.toString() !== ownerId) {
      throw new ForbiddenError('Only owner can add members');
    }

    // Check if already member
    const exists = project.members.some(m => m.user.toString() === userId);
    if (exists) {
      throw new Error('User is already a member');
    }

    project.members.push({ user: userId, role });
    await project.save();

    return project.populate('members.user', 'name email');
  }

  async removeMember(projectId, ownerId, memberId) {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (project.owner.toString() !== ownerId) {
      throw new ForbiddenError('Only owner can remove members');
    }

    project.members = project.members.filter(m => m.user.toString() !== memberId);
    await project.save();

    return project;
  }

  async updateMemberRole(projectId, ownerId, memberId, role) {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new NotFoundError('Project not found');
    }

    if (project.owner.toString() !== ownerId) {
      throw new ForbiddenError('Only owner can update member roles');
    }

    const member = project.members.find(m => m.user.toString() === memberId);
    if (!member) {
      throw new NotFoundError('Member not found');
    }

    member.role = role;
    await project.save();

    return project.populate('members.user', 'name email');
  }
}

module.exports = new ProjectService();
