// Tasks Hook

import { useState, useEffect, useCallback } from 'react';
import { taskApi, Task, CreateTaskData, UpdateTaskData } from '@/lib';
import { useWebSocket } from './useWebSocket';

export function useTasks(filters?: {
  projectId?: string;
  status?: string;
  priority?: string;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { on, WS_EVENTS } = useWebSocket();

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskApi.getAllTasks(filters);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();

    // Listen for real-time updates
    const unsubscribeCreated = on(WS_EVENTS.TASK_CREATED, (task: Task) => {
      // Only add if matches filters
      if (!filters?.projectId || task.projectId === filters.projectId) {
        setTasks(prev => [task, ...prev]);
      }
    });

    const unsubscribeUpdated = on(WS_EVENTS.TASK_UPDATED, (task: Task) => {
      setTasks(prev => prev.map(t => t._id === task._id ? task : t));
    });

    const unsubscribeDeleted = on(WS_EVENTS.TASK_DELETED, (data: { id: string }) => {
      setTasks(prev => prev.filter(t => t._id !== data.id));
    });

    const unsubscribeStatusChanged = on(WS_EVENTS.TASK_STATUS_CHANGED, (data: { id: string; status: string }) => {
      setTasks(prev => prev.map(t => t._id === data.id ? { ...t, status: data.status as Task['status'] } : t));
    });

    return () => {
      unsubscribeCreated();
      unsubscribeUpdated();
      unsubscribeDeleted();
      unsubscribeStatusChanged();
    };
  }, [fetchTasks, filters, on, WS_EVENTS]);

  const createTask = useCallback(async (data: CreateTaskData) => {
    try {
      const newTask = await taskApi.createTask(data);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id: string, data: UpdateTaskData) => {
    try {
      const updated = await taskApi.updateTask(id, data);
      setTasks(prev => prev.map(t => t._id === id ? updated : t));
      return updated;
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      throw err;
    }
  }, []);

  const updateTaskStatus = useCallback(async (id: string, status: Task['status']) => {
    try {
      const updated = await taskApi.updateTaskStatus(id, status);
      setTasks(prev => prev.map(t => t._id === id ? updated : t));
      return updated;
    } catch (err) {
      throw err;
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
}

export function useTask(id: string) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { on, WS_EVENTS } = useWebSocket();

  const fetchTask = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskApi.getTaskById(id);
      setTask(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch task');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchTask();

      // Listen for updates to this specific task
      const unsubscribe = on(WS_EVENTS.TASK_UPDATED, (updated: Task) => {
        if (updated._id === id) {
          setTask(updated);
        }
      });

      return unsubscribe;
    }
  }, [id, fetchTask, on, WS_EVENTS]);

  return { task, loading, error, refetch: fetchTask };
}
