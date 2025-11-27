// Analytics API client

import { api } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTask: number;
  productivity: number;
}

export interface TaskAnalytics {
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  completionRate: number;
  averageCompletionTime: number;
}

export interface ProjectAnalytics {
  byStatus: Record<string, number>;
  taskDistribution: Array<{ projectName: string; taskCount: number }>;
  completionRate: number;
}

export interface ProductivityMetrics {
  tasksCompletedToday: number;
  tasksCompletedThisWeek: number;
  tasksCompletedThisMonth: number;
  averageTasksPerDay: number;
  productivityTrend: 'up' | 'down' | 'stable';
}

export interface Trends {
  daily: Array<{ date: string; completed: number; created: number }>;
  weekly: Array<{ week: string; completed: number; created: number }>;
  monthly: Array<{ month: string; completed: number; created: number }>;
}

export const analyticsApi = {
  // Get dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_URL}/api/v1/analytics/dashboard`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch dashboard stats');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Get task analytics
  async getTaskAnalytics(filters?: {
    projectId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<TaskAnalytics> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const response = await fetch(`${API_URL}/api/v1/analytics/tasks?${params}`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch task analytics');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Get project analytics
  async getProjectAnalytics(): Promise<ProjectAnalytics> {
    const response = await fetch(`${API_URL}/api/v1/analytics/projects`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch project analytics');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Get productivity metrics
  async getProductivityMetrics(): Promise<ProductivityMetrics> {
    const response = await fetch(`${API_URL}/api/v1/analytics/productivity`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch productivity metrics');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Get trends
  async getTrends(period: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<Trends> {
    const response = await fetch(`${API_URL}/api/v1/analytics/trends?period=${period}`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch trends');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Get dashboard overview
  async getDashboardOverview(): Promise<any> {
    const response = await fetch(`${API_URL}/api/v1/analytics/overview`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch dashboard overview');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Get user analytics
  async getUserAnalytics(): Promise<any> {
    const response = await fetch(`${API_URL}/api/v1/analytics/user`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user analytics');
    }

    const data = await response.json();
    return data.data || data;
  },
};
