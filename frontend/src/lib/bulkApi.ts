/**
 * Bulk Operations API Client
 */

import { api } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class BulkApiClient {
  private getHeaders(): HeadersInit {
    const token = api.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async bulkUpdateTasks(taskIds: string[], updates: any): Promise<any> {
    const response = await fetch(`${API_URL}/api/bulk/tasks/update`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ taskIds, updates }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }

  async bulkDeleteTasks(taskIds: string[]): Promise<any> {
    const response = await fetch(`${API_URL}/api/bulk/tasks/delete`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify({ taskIds }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }

  async bulkAssignTasks(taskIds: string[], assigneeId: string): Promise<any> {
    const response = await fetch(`${API_URL}/api/bulk/tasks/assign`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ taskIds, assigneeId }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }

  async bulkUpdateProjects(projectIds: string[], updates: any): Promise<any> {
    const response = await fetch(`${API_URL}/api/bulk/projects/update`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ projectIds, updates }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }
}

export const bulkApi = new BulkApiClient();
