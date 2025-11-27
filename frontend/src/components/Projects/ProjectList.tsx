'use client';

/**
 * Project List Component
 */

import { useState, useMemo } from 'react';
import { useProjects } from '@/hooks';
import { ProjectCard } from './ProjectCard';
import { SkeletonProjectCard } from '../UI/Skeleton';

interface ProjectListProps {
  showFilters?: boolean;
  emptyMessage?: string;
}

export function ProjectList({ showFilters = true, emptyMessage = 'No projects found' }: ProjectListProps) {
  const { projects, loading, error } = useProjects();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return filtered;
  }, [projects, statusFilter, sortBy]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonProjectCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-lg">{error}</div>;
  }

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-4 mb-6">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
            <option value="createdAt">Newest First</option>
            <option value="name">Name</option>
          </select>
          <span className="text-sm text-gray-500 self-center ml-auto">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">{emptyMessage}</p>
          <p className="text-sm">Create a new project to get started</p>
        </div>
      )}
    </div>
  );
}
