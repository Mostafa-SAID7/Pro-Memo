'use client';

/**
 * Project Card Component
 */

import { useState } from 'react';
import { Project, projectApi } from '@/lib';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  onUpdate?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
}

export function ProjectCard({ project, onUpdate, onDelete }: ProjectCardProps) {
  const statusColors = {
    'planning': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    'active': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'on-hold': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    'completed': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'archived': 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
  };

  const priorityColors = {
    low: 'border-gray-300',
    medium: 'border-blue-400',
    high: 'border-orange-400',
    urgent: 'border-red-500'
  };

  return (
    <Link href={`/projects/${project._id}`}>
      <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-l-4 ${priorityColors[project.priority || 'medium']} hover:shadow-md transition-all cursor-pointer`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
              {project.name}
            </h3>
            <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${statusColors[project.status || 'planning']}`}>
              {project.status || 'planning'}
            </span>
          </div>
          {project.color && (
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color }} />
          )}
        </div>

        {project.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>📅 {new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
          {project.members && (
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((member, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">
                  {(member as any).user?.name?.[0] || '?'}
                </div>
              ))}
              {project.members.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">
                  +{project.members.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
