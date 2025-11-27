/**
 * Task card component
 */

'use client';

import { Task } from '@/lib/projectApi';
import { Badge } from '../UI/Badge';
import { formatRelativeTime } from '@/utils/format';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const priorityColors = {
    low: 'default',
    medium: 'info',
    high: 'warning',
    urgent: 'error',
  } as const;

  const statusColors = {
    todo: 'default',
    'in-progress': 'info',
    review: 'warning',
    done: 'success',
    blocked: 'error',
  } as const;

  return (
    <div
      onClick={onClick}
      className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 flex-1">
          {task.title}
        </h3>
        <Badge variant={priorityColors[task.priority]} size="sm">
          {task.priority}
        </Badge>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Badge variant={statusColors[task.status]} size="sm">
            {task.status}
          </Badge>
          {task.project && (
            <span
              className="px-2 py-1 rounded"
              style={{ backgroundColor: `${task.project.color}20`, color: task.project.color }}
            >
              {task.project.name}
            </span>
          )}
        </div>

        {task.dueDate && (
          <span className="text-gray-500 dark:text-gray-400">
            Due {formatRelativeTime(task.dueDate)}
          </span>
        )}
      </div>

      {task.assignee && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-xs font-medium">
            {task.assignee.name.charAt(0).toUpperCase()}
          </div>
          <span>{task.assignee.name}</span>
        </div>
      )}
    </div>
  );
}
