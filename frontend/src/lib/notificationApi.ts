// Notification API client

import { api } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Notification {
  _id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export const notificationApi = {
  // Get all notifications
  async getNotifications(limit?: number): Promise<Notification[]> {
    const params = limit ? `?limit=${limit}` : '';
    const response = await fetch(`${API_URL}/api/v1/notifications${params}`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch notifications');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Get unread notifications
  async getUnreadNotifications(): Promise<Notification[]> {
    const response = await fetch(`${API_URL}/api/v1/notifications/unread`, {
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch unread notifications');
    }

    const data = await response.json();
    return data.data || data;
  },

  // Mark notification as read
  async markAsRead(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/notifications/${id}/read`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to mark notification as read');
    }
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/notifications/read-all`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to mark all notifications as read');
    }
  },

  // Delete notification
  async deleteNotification(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/notifications/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete notification');
    }
  },
};
