/**
 * Project card component
 */

'use client';

import { Project } from '@/lib/projectApi';
import { Badge } from './Badge';
import { Progress } from './Progress';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    planning: 'default',
    active: 'info',
    'on-hold': 'warning',
    completed: 'success',
    archived: 'default',
  } as const;

  const priorityColors = {
    low: 'default',
    medium: 'info',
    high: 'warning',
    urgent: 'error',
  } as const;

  const completionPercentage = project.taskStats
    ? (project.taskStats.done / project.taskStats.total) * 100 || 0
    : 0;

  return (
    <Link href={`/projects/${project._id}`}>
      <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {project.name}
            </h3>
          </div>
          <div className="flex gap-2">
            <Badge variant={statusColors[project.status]} size="sm">
              {project.status}
            </Badge>
            <Badge variant={priorityColors[project.priority]} size="sm">
              {project.priority}
            </Badge>
          </div>
        </div>

        {project.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {project.description}
          </p>
        )}

        {project.taskStats && project.taskStats.total > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {project.taskStats.done} / {project.taskStats.total} tasks
              </span>
            </div>
            <Progress
              value={completionPercentage}
              variant={completionPercentage === 100 ? 'success' : 'default'}
            />
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((member, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium"
                  title={member.user.name}
                >
                  {member.user.name.charAt(0).toUpperCase()}
                </div>
              ))}
              {project.members.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium">
                  +{project.members.length - 3}
                </div>
              )}
            </div>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="flex gap-1">
              {project.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
