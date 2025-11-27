// Notifications Hook

import { useState, useEffect, useCallback } from 'react';
import { notificationApi, Notification } from '@/lib';
import { useWebSocket } from './useWebSocket';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { on, WS_EVENTS } = useWebSocket();

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await notificationApi.getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    // Listen for new notifications
    const unsubscribe = on(WS_EVENTS.NOTIFICATION_NEW, (notification: Notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    return unsubscribe;
  }, [fetchNotifications, on, WS_EVENTS]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await notificationApi.markAsRead(id);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  }, []);

  const deleteNotification = useCallback(async (id: string) => {
    try {
      await notificationApi.deleteNotification(id);
      setNotifications(prev => {
        const notification = prev.find(n => n._id === id);
        if (notification && !notification.read) {
          setUnreadCount(count => Math.max(0, count - 1));
        }
        return prev.filter(n => n._id !== id);
      });
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
