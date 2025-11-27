'use client';

/**
 * Activity Timeline Component
 * Shows real-time activity feed
 */

import { useEffect, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { formatDistanceToNow } from 'date-fns';
import { 
  File01Icon, 
  Task01Icon, 
  UserIcon, 
  Message01Icon,
  CheckmarkCircle01Icon,
  Delete02Icon
} from 'hugeicons-react';

interface Activity {
  _id: string;
  action: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  metadata: any;
  createdAt: string;
}

interface ActivityTimelineProps {
  projectId?: string;
  userId?: string;
  limit?: number;
}

export function ActivityTimeline({ projectId, userId, limit = 20 }: ActivityTimelineProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { on, isConnected } = useWebSocket();

  useEffect(() => {
    loadActivities();
  }, [projectId, userId]);

  useEffect(() => {
    if (!isConnected) return;

    // Listen for new activities
    const unsubscribe = on('activity:new', (activity: Activity) => {
      setActivities(prev => [activity, ...prev].slice(0, limit));
    });

    return unsubscribe;
  }, [isConnected, on, limit]);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (projectId) params.append('projectId', projectId);
      if (userId) params.append('userId', userId);
      params.append('limit', limit.toString());

      const response = await fetch(`/api/activities?${params}`);
      const data = await response.json();
      setActivities(data.data || []);
    } catch (error) {
      console.error('Failed to load activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'project_created':
      case 'project_updated':
        return <File01Icon className="w-5 h-5 text-blue-500" />;
      case 'task_created':
      case 'task_updated':
        return <Task01Icon className="w-5 h-5 text-green-500" />;
      case 'task_status_changed':
        return <CheckmarkCircle01Icon className="w-5 h-5 text-purple-500" />;
      case 'task_assigned':
        return <UserIcon className="w-5 h-5 text-orange-500" />;
      case 'comment_added':
        return <Message01Icon className="w-5 h-5 text-indigo-500" />;
      case 'task_deleted':
      case 'project_deleted':
        return <Delete02Icon className="w-5 h-5 text-red-500" />;
      default:
        return <File01Icon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActivityMessage = (activity: Activity) => {
    const { action, user, metadata } = activity;
    
    switch (action) {
      case 'project_created':
        return `${user.name} created project "${metadata.projectName}"`;
      case 'project_updated':
        return `${user.name} updated project "${metadata.projectName}"`;
      case 'project_deleted':
        return `${user.name} deleted project "${metadata.projectName}"`;
      case 'task_created':
        return `${user.name} created task "${metadata.taskTitle}"`;
      case 'task_updated':
        return `${user.name} updated task "${metadata.taskTitle}"`;
      case 'task_status_changed':
        return `${user.name} changed "${metadata.taskTitle}" from ${metadata.oldStatus} to ${metadata.newStatus}`;
      case 'task_assigned':
        return `${user.name} assigned "${metadata.taskTitle}" to ${metadata.assigneeName}`;
      case 'task_deleted':
        return `${user.name} deleted task "${metadata.taskTitle}"`;
      case 'comment_added':
        return `${user.name} commented on "${metadata.taskTitle}"`;
      default:
        return `${user.name} performed ${action}`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500 dark:text-gray-400">
        No activities yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={activity._id} className="flex gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-1">
            {getActivityIcon(activity.action)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 dark:text-gray-100">
              {getActivityMessage(activity)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
            </p>
          </div>

          {/* Connector line */}
          {index < activities.length - 1 && (
            <div className="absolute left-[10px] top-8 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
          )}
        </div>
      ))}
    </div>
  );
}
