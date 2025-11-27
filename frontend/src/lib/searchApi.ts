// Search API client

import { api } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface SearchResult {
  type: 'task' | 'project' | 'user';
  id: string;
  title: string;
  description?: string;
  relevance: number;
  metadata?: any;
}

export const searchApi = {
  // Global search
  async globalSearch(query: string, filters?: {
    type?: 'task' | 'project' | 'user';
    limit?: number;
  }): Promise<SearchResult[]> {
    const params = new URLSearchParams({ q: query });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value.toString());
      });
    }

    const response = await fetch(`${API_URL}/api/v1/search?${params}`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Search failed');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Search tasks
  async searchTasks(query: string, filters?: {
    projectId?: string;
    status?: string;
    priority?: string;
  }): Promise<any[]> {
    const params = new URLSearchParams({ q: query });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const response = await fetch(`${API_URL}/api/v1/search/tasks?${params}`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Task search failed');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Search projects
  async searchProjects(query: string): Promise<any[]> {
    const params = new URLSearchParams({ q: query });

    const response = await fetch(`${API_URL}/api/v1/search/projects?${params}`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Project search failed');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Get search suggestions
  async getSearchSuggestions(query: string): Promise<string[]> {
    const params = new URLSearchParams({ q: query });

    const response = await fetch(`${API_URL}/api/v1/search/suggestions?${params}`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch suggestions');
    }

    const data = await response.json();
    return data.data || data;
  },
};
