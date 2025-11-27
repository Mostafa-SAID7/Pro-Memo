/**
 * AI Service
 * Business logic for AI-powered features
 */

const Task = require('../../models/task/Task');
const Project = require('../../models/project/Project');

class AIService {
  // Get smart suggestions based on context
  async getSuggestions(userId, context = {}) {
    const suggestions = [];
    
    // Get user's tasks and projects for analysis
    const [tasks, projects] = await Promise.all([
      Task.find({ $or: [{ creator: userId }, { assignee: userId }] }).limit(50),
      Project.find({ $or: [{ owner: userId }, { 'members.user': userId }] }).limit(20)
    ]);

    // Analyze overdue tasks
    const overdueTasks = tasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done'
    );
    
    if (overdueTasks.length > 0) {
      suggestions.push({
        type: 'warning',
        title: 'Overdue Tasks Alert',
        description: `You have ${overdueTasks.length} overdue task(s). Consider prioritizing these.`,
        priority: 'high',
        action: { type: 'view_overdue', taskIds: overdueTasks.map(t => t._id) }
      });
    }

    // Analyze task distribution
    const todoTasks = tasks.filter(t => t.status === 'todo');
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
    
    if (inProgressTasks.length > 5) {
      suggestions.push({
        type: 'info',
        title: 'Too Many Tasks In Progress',
        description: 'Consider completing some tasks before starting new ones to improve focus.',
        priority: 'medium',
        action: { type: 'focus_tasks' }
      });
    }

    // Suggest task prioritization
    const highPriorityTodo = todoTasks.filter(t => t.priority === 'high' || t.priority === 'urgent');
    if (highPriorityTodo.length > 0 && inProgressTasks.length === 0) {
      suggestions.push({
        type: 'suggestion',
        title: 'Start High Priority Tasks',
        description: `You have ${highPriorityTodo.length} high priority task(s) waiting. Start working on them!`,
        priority: 'high',
        action: { type: 'start_task', taskId: highPriorityTodo[0]._id }
      });
    }

    // Project health suggestions
    const activeProjects = projects.filter(p => p.status === 'active');
    for (const project of activeProjects.slice(0, 3)) {
      const projectTasks = tasks.filter(t => t.project?.toString() === project._id.toString());
      const completedTasks = projectTasks.filter(t => t.status === 'done');
      const completionRate = projectTasks.length > 0 
        ? Math.round((completedTasks.length / projectTasks.length) * 100) 
        : 0;
      
      if (completionRate < 30 && projectTasks.length > 5) {
        suggestions.push({
          type: 'info',
          title: `Project "${project.name}" Needs Attention`,
          description: `Only ${completionRate}% complete. Consider breaking down tasks or reassigning.`,
          priority: 'medium',
          action: { type: 'view_project', projectId: project._id }
        });
      }
    }

    // Productivity suggestions
    const completedToday = tasks.filter(t => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return t.status === 'done' && new Date(t.updatedAt) >= today;
    });

    if (completedToday.length >= 5) {
      suggestions.push({
        type: 'success',
        title: 'Great Productivity!',
        description: `You've completed ${completedToday.length} tasks today. Keep up the great work!`,
        priority: 'low'
      });
    }

    return suggestions.slice(0, 5); // Return top 5 suggestions
  }

  // Analyze a task and provide insights
  async analyzeTask(taskData) {
    const { title, description, projectId } = taskData;
    
    // Simple complexity analysis based on description length and keywords
    const complexityKeywords = ['complex', 'difficult', 'integration', 'refactor', 'migrate', 'architecture'];
    const simpleKeywords = ['fix', 'update', 'change', 'add', 'remove', 'simple'];
    
    const text = `${title} ${description || ''}`.toLowerCase();
    const hasComplexKeywords = complexityKeywords.some(k => text.includes(k));
    const hasSimpleKeywords = simpleKeywords.some(k => text.includes(k));
    
    let complexity = 'medium';
    let estimatedHours = 4;
    
    if (hasComplexKeywords && !hasSimpleKeywords) {
      complexity = 'high';
      estimatedHours = 8;
    } else if (hasSimpleKeywords && !hasComplexKeywords) {
      complexity = 'low';
      estimatedHours = 2;
    }

    // Suggest priority based on keywords
    const urgentKeywords = ['urgent', 'asap', 'critical', 'blocker', 'emergency'];
    const highKeywords = ['important', 'priority', 'deadline', 'client'];
    
    let suggestedPriority = 'medium';
    if (urgentKeywords.some(k => text.includes(k))) {
      suggestedPriority = 'urgent';
    } else if (highKeywords.some(k => text.includes(k))) {
      suggestedPriority = 'high';
    }

    const recommendations = [];
    if (complexity === 'high') {
      recommendations.push('Consider breaking this task into smaller subtasks');
      recommendations.push('Schedule dedicated focus time for this task');
    }
    if (!description) {
      recommendations.push('Add a detailed description for better clarity');
    }
    if (text.length < 20) {
      recommendations.push('Provide more context in the task title or description');
    }

    const risks = [];
    if (complexity === 'high') {
      risks.push('May take longer than estimated');
      risks.push('Could have dependencies on other tasks');
    }

    return {
      complexity,
      estimatedHours,
      suggestedPriority,
      recommendations,
      risks
    };
  }

  // Generate task description from title
  async generateDescription(title, context = '') {
    // Simple template-based description generation
    const templates = {
      'fix': `Investigate and resolve the issue related to ${title.replace(/fix/i, '').trim()}. 
        
Steps:
1. Reproduce the issue
2. Identify root cause
3. Implement fix
4. Test thoroughly
5. Document changes`,
      
      'add': `Implement new feature: ${title.replace(/add/i, '').trim()}.

Requirements:
1. Define acceptance criteria
2. Design solution
3. Implement feature
4. Write tests
5. Update documentation`,
      
      'update': `Update ${title.replace(/update/i, '').trim()}.

Tasks:
1. Review current implementation
2. Plan changes
3. Implement updates
4. Verify functionality
5. Deploy changes`,
      
      'default': `Task: ${title}

${context ? `Context: ${context}\n\n` : ''}Objectives:
1. Understand requirements
2. Plan implementation
3. Execute task
4. Review and test
5. Mark as complete`
    };

    const lowerTitle = title.toLowerCase();
    let description = templates.default;
    
    for (const [key, template] of Object.entries(templates)) {
      if (key !== 'default' && lowerTitle.includes(key)) {
        description = template;
        break;
      }
    }

    return description;
  }

  // Predict task completion date
  async predictCompletion(taskId, userId) {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    // Get user's historical completion data
    const completedTasks = await Task.find({
      $or: [{ creator: userId }, { assignee: userId }],
      status: 'done'
    }).sort({ updatedAt: -1 }).limit(20);

    // Calculate average completion time
    let avgCompletionDays = 3; // Default
    if (completedTasks.length > 0) {
      const completionTimes = completedTasks.map(t => {
        const created = new Date(t.createdAt);
        const completed = new Date(t.updatedAt);
        return (completed - created) / (1000 * 60 * 60 * 24); // Days
      });
      avgCompletionDays = completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length;
    }

    // Adjust based on priority
    const priorityMultiplier = {
      'urgent': 0.5,
      'high': 0.75,
      'medium': 1,
      'low': 1.5
    };
    
    const adjustedDays = avgCompletionDays * (priorityMultiplier[task.priority] || 1);
    const predictedDate = new Date();
    predictedDate.setDate(predictedDate.getDate() + Math.ceil(adjustedDays));

    return {
      predictedDate: predictedDate.toISOString(),
      confidence: completedTasks.length > 10 ? 0.8 : completedTasks.length > 5 ? 0.6 : 0.4,
      factors: [
        { factor: 'Historical average', impact: `${avgCompletionDays.toFixed(1)} days` },
        { factor: 'Priority adjustment', impact: `${task.priority} priority` },
        { factor: 'Data points', impact: `${completedTasks.length} completed tasks` }
      ]
    };
  }

  // Smart categorization
  async smartCategorize(items) {
    const categories = {
      'bug': ['bug', 'fix', 'error', 'issue', 'broken', 'crash'],
      'feature': ['add', 'new', 'feature', 'implement', 'create'],
      'improvement': ['improve', 'enhance', 'optimize', 'refactor', 'update'],
      'documentation': ['doc', 'readme', 'comment', 'guide', 'tutorial'],
      'testing': ['test', 'spec', 'coverage', 'qa', 'verify']
    };

    return items.map(item => {
      const text = `${item.title} ${item.description || ''}`.toLowerCase();
      let category = 'general';
      
      for (const [cat, keywords] of Object.entries(categories)) {
        if (keywords.some(k => text.includes(k))) {
          category = cat;
          break;
        }
      }
      
      return { ...item, suggestedCategory: category };
    });
  }

  // Auto-generate tags
  async autoTag(title, description = '') {
    const text = `${title} ${description}`.toLowerCase();
    const tags = [];
    
    const tagKeywords = {
      'frontend': ['ui', 'frontend', 'react', 'css', 'html', 'component', 'design'],
      'backend': ['api', 'backend', 'server', 'database', 'endpoint'],
      'bug': ['bug', 'fix', 'error', 'issue'],
      'feature': ['feature', 'new', 'add'],
      'urgent': ['urgent', 'asap', 'critical'],
      'documentation': ['doc', 'readme', 'guide'],
      'testing': ['test', 'spec', 'qa'],
      'performance': ['performance', 'optimize', 'speed', 'slow'],
      'security': ['security', 'auth', 'permission', 'vulnerability']
    };

    for (const [tag, keywords] of Object.entries(tagKeywords)) {
      if (keywords.some(k => text.includes(k))) {
        tags.push(tag);
      }
    }

    return tags.slice(0, 5); // Max 5 tags
  }
}

module.exports = new AIService();
