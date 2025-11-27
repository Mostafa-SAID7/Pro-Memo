// Projects Hook

import { useState, useEffect, useCallback } from 'react';
import { projectApi, Project, CreateProjectData, UpdateProjectData } from '@/lib';
import { useWebSocket } from './useWebSocket';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { on, WS_EVENTS } = useWebSocket();

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectApi.getAllProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();

    // Listen for real-time updates
    const unsubscribeCreated = on(WS_EVENTS.PROJECT_CREATED, (project: Project) => {
      setProjects(prev => [project, ...prev]);
    });

    const unsubscribeUpdated = on(WS_EVENTS.PROJECT_UPDATED, (project: Project) => {
      setProjects(prev => prev.map(p => p._id === project._id ? project : p));
    });

    const unsubscribeDeleted = on(WS_EVENTS.PROJECT_DELETED, (data: { id: string }) => {
      setProjects(prev => prev.filter(p => p._id !== data.id));
    });

    return () => {
      unsubscribeCreated();
      unsubscribeUpdated();
      unsubscribeDeleted();
    };
  }, [fetchProjects, on, WS_EVENTS]);

  const createProject = useCallback(async (data: CreateProjectData) => {
    try {
      const newProject = await projectApi.createProject(data);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      throw err;
    }
  }, []);

  const updateProject = useCallback(async (id: string, data: UpdateProjectData) => {
    try {
      const updated = await projectApi.updateProject(id, data);
      setProjects(prev => prev.map(p => p._id === id ? updated : p));
      return updated;
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    try {
      await projectApi.deleteProject(id);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      throw err;
    }
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { on, WS_EVENTS } = useWebSocket();

  const fetchProject = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectApi.getProjectById(id);
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch project');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProject();

      // Listen for updates to this specific project
      const unsubscribe = on(WS_EVENTS.PROJECT_UPDATED, (updated: Project) => {
        if (updated._id === id) {
          setProject(updated);
        }
      });

      return unsubscribe;
    }
  }, [id, fetchProject, on, WS_EVENTS]);

  return { project, loading, error, refetch: fetchProject };
}
