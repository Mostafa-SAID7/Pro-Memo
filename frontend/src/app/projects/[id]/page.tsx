'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { projectApi, Project } from '@/lib/projectApi';
import { Task } from '@/lib/projectApi';
import { Badge } from '@/components/UI/Badge';
import { SkeletonCard, SkeletonStatCard } from '@/components/UI/Skeleton';

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
    loadProject();
    loadTasks();
    }
  }, [params.id]);

  const loadProject = async () => {
    try {
      const data = await projectApi.getProjectById(params.id as string);
      setProject(data);
    } catch (error) {
      console.error('Failed to load project:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      const { data } = await projectApi.getTasks({ projectId: params.id as string });
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonStatCard key={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
                <div className="space-y-3">
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  const tasksByStatus = {
    todo: tasks.filter(t => t.status === 'todo'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    review: tasks.filter(t => t.status === 'review'),
    done: tasks.filter(t => t.status === 'done'),
    blocked: tasks.filter(t => t.status === 'blocked'),
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {project.name}
            </h1>
            <Badge variant="info">{project.status}</Badge>
          </div>
          {project.description && (
            <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
          )}
        </div>

        {/* Stats */}
        {project.taskStats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-2xl font-bold">{project.taskStats.total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">{project.taskStats.todo}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">To Do</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-2xl font-bold text-yellow-600">{project.taskStats['in-progress']}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{project.taskStats.done}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Done</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="text-2xl font-bold text-red-600">{project.taskStats.blocked}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Blocked</div>
            </div>
          </div>
        )}

        {/* Tasks Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
            <div key={status} className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold mb-4 capitalize flex items-center justify-between">
                {status.replace('-', ' ')}
                <span className="text-sm text-gray-500">({statusTasks.length})</span>
              </h3>
              <div className="space-y-3">
                {statusTasks.map(task => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
