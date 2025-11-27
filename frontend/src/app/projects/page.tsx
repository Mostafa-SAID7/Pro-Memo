'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { projectApi, Project } from '@/lib/projectApi';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SearchInput } from '@/components/SearchInput';
import { Badge } from '@/components/Badge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EmptyState } from '@/components/EmptyState';
import { Modal } from '@/components/Modal';
import { toast } from '@/lib/toast';
import { useAsync } from '@/hooks/useAsync';

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { loading, execute } = useAsync();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data } = await execute(() => projectApi.getProjects());
      setProjects(data);
      setFilteredProjects(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load projects');
    }
  };

  const handleSearch = (query: string) => {
    const filtered = projects.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    if (status === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p) => p.status === status));
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      planning: 'default',
      active: 'primary',
      'on-hold': 'warning',
      completed: 'success',
      archived: 'default',
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, any> = {
      low: 'default',
      medium: 'info',
      high: 'warning',
      urgent: 'error',
    };
    return colors[priority] || 'default';
  };

  if (loading && projects.length === 0) {
    return <LoadingSpinner fullScreen message="Loading projects..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your projects
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <SearchInput onSearch={handleSearch} placeholder="Search projects..." />
          </div>

          <div className="flex gap-2 flex-wrap">
            {['all', 'planning', 'active', 'on-hold', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    statusFilter === status
                      ? 'bg-primary-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <Button onClick={() => setIsCreateModalOpen(true)}>
            + New Project
          </Button>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <EmptyState
            icon="📁"
            title="No projects found"
            description="Create your first project to get started"
            action={{
              label: 'Create Project',
              onClick: () => setIsCreateModalOpen(true),
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project._id}
                hover
                className="cursor-pointer"
                onClick={() => router.push(`/projects/${project._id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.title.charAt(0).toUpperCase()}
                  </div>
                  <Badge variant={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {project.title}
                </h3>

                {project.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm">
                  <Badge variant={getPriorityColor(project.priority)} size="sm">
                    {project.priority}
                  </Badge>
                  <span className="text-gray-500 dark:text-gray-400">
                    {project.progress}% complete
                  </span>
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Create Project Modal */}
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false);
            loadProjects();
          }}
        />
      </div>
    </div>
  );
}

function CreateProjectModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'planning',
    priority: 'medium',
    color: '#3b82f6',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await projectApi.createProject(formData);
      toast.success('Project created successfully');
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="w-full h-10 rounded-lg cursor-pointer"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" loading={loading} fullWidth>
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
