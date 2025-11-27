'use client';

/**
 * Task Card Component
 * Displays a task in a card format
 */

import { useState } from 'react';
import { Task, taskApi } from '@/lib';

interface TaskCardProps {
  task: Task;
  onUpdate?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  showProject?: boolean;
}

export function TaskCard({ task, onUpdate, onDelete, showProject = true }: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const priorityColors = {
    low: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
  };

  const statusColors = {
    'todo': 'bg-gray-200 dark:bg-gray-600',
    'in-progress': 'bg-blue-500',
    'review': 'bg-yellow-500',
    'done': 'bg-green-500',
    'blocked': 'bg-red-500'
  };

  const handleStatusChange = async (newStatus: Task['status']) => {
    if (isUpdating) return;
    
    try {
      setIsUpdating(true);
      const updated = await taskApi.updateTaskStatus(task._id, newStatus);
      onUpdate?.(updated);
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: 'text-red-500' };
    if (diffDays === 0) return { text: 'Due today', color: 'text-orange-500' };
    if (diffDays === 1) return { text: 'Due tomorrow', color: 'text-yellow-500' };
    if (diffDays <= 7) return { text: `Due in ${diffDays} days`, color: 'text-blue-500' };
    return { text: date.toLocaleDateString(), color: 'text-gray-500' };
  };

  const dueInfo = formatDate(task.dueDate);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {task.title}
          </h3>
          {showProject && task.projectId && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              📁 {typeof task.projectId === 'object' ? (task.projectId as any).name : 'Project'}
            </p>
          )}
        </div>
        <div className={`w-3 h-3 rounded-full ${statusColors[task.status]}`} title={task.status} />
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{task.tags.length - 3}</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          {dueInfo && (
            <span className={`text-xs ${dueInfo.color}`}>
              {dueInfo.text}
            </span>
          )}
        </div>

        {/* Status dropdown */}
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
          disabled={isUpdating}
          className="text-xs bg-transparent border border-gray-200 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
    </div>
  );
}
