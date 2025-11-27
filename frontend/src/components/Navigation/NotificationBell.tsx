/**
 * Notification bell component
 */

'use client';

import { useState, useEffect } from 'react';
import { Dropdown, DropdownItem, DropdownDivider } from './Dropdown';
import { Badge } from './Badge';
import { formatRelativeTime } from '@/utils/format';

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotifications();
    loadUnreadCount();

    // Poll for new notifications every 30 seconds
    const interval = setInterval(() => {
      loadUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call
      setNotifications([]);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      // TODO: Implement API call
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to load unread count:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      // TODO: Implement API call
      setNotifications(prev =>
        prev.map(n => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // TODO: Implement API call
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  return (
    <Dropdown
      trigger={
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      }
      align="right"
    >
      <div className="w-80 max-h-96 overflow-y-auto">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary-600 hover:text-primary-700"
            >
              Mark all read
            </button>
          )}
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No notifications
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification._id}
              className={`p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                !notification.isRead ? 'bg-blue-50 dark:bg-blue-950' : ''
              }`}
              onClick={() => markAsRead(notification._id)}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatRelativeTime(notification.createdAt)}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Dropdown>
  );
}
