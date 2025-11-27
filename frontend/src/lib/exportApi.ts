/**
 * Export/Import API Client
 */

import { api } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ExportApiClient {
  private getHeaders(): HeadersInit {
    const token = api.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async exportProjectsCSV(): Promise<Blob> {
    const token = api.getToken();
    const response = await fetch(`${API_URL}/api/export/projects/csv`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Export failed');
    return response.blob();
  }

  async exportProjectsExcel(): Promise<Blob> {
    const token = api.getToken();
    const response = await fetch(`${API_URL}/api/export/projects/excel`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Export failed');
    return response.blob();
  }

  async exportTasksCSV(projectId?: string): Promise<Blob> {
    const token = api.getToken();
    const url = projectId 
      ? `${API_URL}/api/export/tasks/csv?projectId=${projectId}`
      : `${API_URL}/api/export/tasks/csv`;
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Export failed');
    return response.blob();
  }

  async exportTasksExcel(projectId?: string): Promise<Blob> {
    const token = api.getToken();
    const url = projectId 
      ? `${API_URL}/api/export/tasks/excel?projectId=${projectId}`
      : `${API_URL}/api/export/tasks/excel`;
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Export failed');
    return response.blob();
  }

  async exportJSON(type: string = 'all'): Promise<Blob> {
    const token = api.getToken();
    const response = await fetch(`${API_URL}/api/export/json?type=${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Export failed');
    return response.blob();
  }

  async importTasksCSV(projectId: string, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    const token = api.getToken();
    const response = await fetch(`${API_URL}/api/export/tasks/csv`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    return result.data;
  }

  downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

export const exportApi = new ExportApiClient();
