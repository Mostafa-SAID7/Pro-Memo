// AI API client

import { api } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface AISuggestion {
  type: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  action?: any;
}

export interface TaskAnalysis {
  complexity: 'low' | 'medium' | 'high';
  estimatedHours: number;
  suggestedPriority: 'low' | 'medium' | 'high' | 'urgent';
  recommendations: string[];
  risks: string[];
}

export interface CompletionPrediction {
  predictedDate: string;
  confidence: number;
  factors: Array<{ factor: string; impact: string }>;
}

export const aiApi = {
  // Get AI suggestions
  async getSuggestions(context?: {
    taskId?: string;
    projectId?: string;
    context?: 'task' | 'project' | 'dashboard';
  }): Promise<AISuggestion[]> {
    const params = new URLSearchParams();
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const response = await fetch(`${API_URL}/api/v1/ai/suggestions?${params}`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch AI suggestions');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Analyze task
  async analyzeTask(taskData: {
    title: string;
    description?: string;
    projectId?: string;
  }): Promise<TaskAnalysis> {
    const response = await fetch(`${API_URL}/api/v1/ai/analyze-task`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to analyze task');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Generate description
  async generateDescription(title: string, context?: string): Promise<string> {
    const response = await fetch(`${API_URL}/api/v1/ai/generate-description`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, context }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate description');
    }

    const data = await response.json();
    return data.data?.description || data.description || '';
  },

  // Predict completion
  async predictCompletion(taskId: string): Promise<CompletionPrediction> {
    const response = await fetch(`${API_URL}/api/v1/ai/predict-completion`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to predict completion');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Smart categorize
  async smartCategorize(items: Array<{ title: string; description?: string }>): Promise<any> {
    const response = await fetch(`${API_URL}/api/v1/ai/smart-categorize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to categorize items');
    }

    const data = await response.json();
    return data.data || data;
  },
};
