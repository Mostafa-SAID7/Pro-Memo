/**
 * Project and Task API client
 */

import { api } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Project {
  _id: string;
  name: string;
  description?: string;
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  members: Array<{
    user: {
      _id: string;
      name: string;
      email: string;
    };
    role: string;
  }>;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate?: string;
  endDate?: string;
  tags: string[];
  color: string;
  taskStats?: {
    total: number;
    todo: number;
    'in-progress': number;
    review: number;
    done: number;
    blocked: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  project: {
    _id: string;
    name: string;
    color: string;
  };
  assignee?: {
    _id: string;
    name: string;
    email: string;
  };
  creator: {
    _id: string;
    name: string;
    email: string;
  };
  status: 'todo' | 'in-progress' | 'review' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  comments: Array<{
    user: {
      _id: string;
      name: string;
      email: string;
    };
    text: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

class ProjectApiClient {
  private getHeaders(): HeadersInit {
    const token = api.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Projects
  async createProject(data: Partial<Project>): Promise<Project> {
    const response = await fetch(`${API_URL}/api/projects`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }

  async getProjects(params?: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    search?: string;
  }): Promise<{ data: Project[]; pagination: any }> {
    const queryParams = new URLSearchParams(params as any);
    const response = await fetch(`${API_URL}/api/projects?${queryParams}`, {
      headers: this.getHeaders(),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return { data: result.data, pagination: result.pagination };
  }

  async getProjectById(id: string): Promise<Project> {
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
      headers: this.getHeaders(),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }

  async deleteProject(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
  }

  // Tasks
  async createTask(data: Partial<Task> & { projectId: string }): Promise<Task> {
    const response = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }

  async getTasks(params?: {
    projectId?: string;
    status?: string;
    priority?: string;
    assignee?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Task[]; pagination: any }> {
    const queryParams = new URLSearchParams(params as any);
    const response = await fetch(`${API_URL}/api/tasks?${queryParams}`, {
      headers: this.getHeaders(),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return { data: result.data, pagination: result.pagination };
  }

  async getTaskById(id: string): Promise<Task> {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
      headers: this.getHeaders(),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
  }

  async addComment(taskId: string, text: string): Promise<Task> {
    const response = await fetch(`${API_URL}/api/tasks/${taskId}/comments`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }
}

export const projectApi = new ProjectApiClient();
