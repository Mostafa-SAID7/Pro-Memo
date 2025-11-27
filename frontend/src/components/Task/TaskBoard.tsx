'use client';

/**
 * Kanban Task Board with Drag & Drop
 */

import { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { projectApi } from '@/lib/projectApi';

import { Task } from '@/lib/projectApi';

interface TaskBoardProps {
  projectId: string;
}

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900' },
  { id: 'review', title: 'Review', color: 'bg-yellow-100 dark:bg-yellow-900' },
  { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900' },
  { id: 'blocked', title: 'Blocked', color: 'bg-red-100 dark:bg-red-900' },
];

export function TaskBoard({ projectId }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data } = await projectApi.getTasks({ projectId, limit: 100 });
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t._id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as string;

    // Update local state optimistically
    setTasks(prev =>
      prev.map(task =>
        task._id === taskId ? { ...task, status: newStatus as Task['status'] } : task
      )
    );

    // Update on server
    try {
      await projectApi.updateTask(taskId, { status: newStatus as Task['status'] });
    } catch (error) {
      console.error('Failed to update task:', error);
      // Revert on error
      loadTasks();
    }

    setActiveTask(null);
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map(column => {
          const columnTasks = getTasksByStatus(column.id);
          
          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-80"
            >
              {/* Column Header */}
              <div className={`${column.color} rounded-t-lg p-4`}>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {column.title}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    ({columnTasks.length})
                  </span>
                </h3>
              </div>

              {/* Column Content */}
              <SortableContext
                id={column.id}
                items={columnTasks.map(t => t._id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="bg-gray-50 dark:bg-gray-900 rounded-b-lg p-4 min-h-[500px] space-y-3">
                  {columnTasks.map(task => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                  
                  {columnTasks.length === 0 && (
                    <div className="text-center text-gray-400 dark:text-gray-600 py-8">
                      Drop tasks here
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          );
        })}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeTask && (
          <div className="opacity-50">
            <TaskCard task={activeTask} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
