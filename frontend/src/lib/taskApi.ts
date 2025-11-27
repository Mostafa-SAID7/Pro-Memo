// Task API client

import { api } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  projectId: string;
  assignee?: string;
  creator: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  projectId: string;
  status?: Task['status'];
  priority?: Task['priority'];
  assignee?: string;
  dueDate?: string;
  estimatedHours?: number;
  tags?: string[];
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  actualHours?: number;
}

export const taskApi = {
  // Get all tasks
  async getAllTasks(filters?: {
    projectId?: string;
    status?: string;
    priority?: string;
    assignee?: string;
  }): Promise<Task[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const response = await fetch(`${API_URL}/api/v1/tasks?${params}`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch tasks');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Get task by ID
  async getTaskById(id: string): Promise<Task> {
    const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch task');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Create task
  async createTask(taskData: CreateTaskData): Promise<Task> {
    const response = await fetch(`${API_URL}/api/v1/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create task');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Update task
  async updateTask(id: string, taskData: UpdateTaskData): Promise<Task> {
    const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update task');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Delete task
  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete task');
    }
  },

  // Update task status
  async updateTaskStatus(id: string, status: Task['status']): Promise<Task> {
    const response = await fetch(`${API_URL}/api/v1/tasks/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update task status');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Update task priority
  async updateTaskPriority(id: string, priority: Task['priority']): Promise<Task> {
    const response = await fetch(`${API_URL}/api/v1/tasks/${id}/priority`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priority }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update task priority');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Add comment to task
  async addComment(id: string, comment: string): Promise<any> {
    const response = await fetch(`${API_URL}/api/v1/tasks/${id}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add comment');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Get task comments
  async getComments(id: string): Promise<any[]> {
    const response = await fetch(`${API_URL}/api/v1/tasks/${id}/comments`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch comments');
    }

    const data = await response.json();
    return data.data || data;
  },
};
