# Frontend Integration Documentation

## API Client Structure

```
frontend/src/lib/
├── api.ts                 # Base API client & auth
├── projectApi.ts          # Project operations
├── taskApi.ts             # Task operations
├── analyticsApi.ts        # Analytics & metrics
├── aiApi.ts               # AI features
├── notificationApi.ts     # Notifications
├── searchApi.ts           # Search functionality
├── websocket.ts           # WebSocket client
└── index.ts               # Central exports
```

## React Hooks

```
frontend/src/hooks/
├── useWebSocket.ts        # WebSocket connection
├── useProjects.ts         # Project management
├── useTasks.ts            # Task management
├── useNotifications.ts    # Notifications
└── index.ts               # Central exports
```

## Usage Examples

### Authentication

```typescript
import { api } from '@/lib';

// Register
const response = await api.register(name, email, password);

// Login
const response = await api.login(email, password);

// Get current user
const user = await api.getCurrentUser();

// Check if authenticated
if (api.isAuthenticated()) {
  // User is logged in
}

// Logout
api.logout();
```

### Projects

```typescript
import { projectApi } from '@/lib';
import { useProjects } from '@/hooks';

// Using API directly
const projects = await projectApi.getAllProjects();
const project = await projectApi.getProjectById(id);
const newProject = await projectApi.createProject({
  name: 'My Project',
  description: 'Project description',
  status: 'active',
  priority: 'high'
});

// Using React Hook (with real-time updates)
function ProjectList() {
  const { projects, loading, error, createProject, updateProject, deleteProject } = useProjects();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.map(project => (
        <div key={project._id}>{project.name}</div>
      ))}
    </div>
  );
}
```

### Tasks

```typescript
import { taskApi } from '@/lib';
import { useTasks, useTask } from '@/hooks';

// Using API directly
const tasks = await taskApi.getAllTasks({ projectId: 'xxx' });
const task = await taskApi.getTaskById(id);
const newTask = await taskApi.createTask({
  title: 'My Task',
  description: 'Task description',
  projectId: 'xxx',
  status: 'todo',
  priority: 'high'
});

// Update task status
await taskApi.updateTaskStatus(id, 'in-progress');

// Add comment
await taskApi.addComment(id, 'This is a comment');

// Using React Hook (with real-time updates)
function TaskList({ projectId }: { projectId: string }) {
  const { tasks, loading, createTask, updateTaskStatus } = useTasks({ projectId });

  const handleStatusChange = async (taskId: string, status: string) => {
    await updateTaskStatus(taskId, status as any);
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id}>
          {task.title}
          <button onClick={() => handleStatusChange(task._id, 'done')}>
            Mark Done
          </button>
        </div>
      ))}
    </div>
  );
}

// Single task with real-time updates
function TaskDetail({ id }: { id: string }) {
  const { task, loading, error } = useTask(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!task) return <div>Task not found</div>;

  return <div>{task.title}</div>;
}
```

### Analytics

```typescript
import { analyticsApi } from '@/lib';

// Dashboard stats
const stats = await analyticsApi.getDashboardStats();
console.log(stats.totalProjects, stats.totalTasks, stats.completedTasks);

// Task analytics
const taskAnalytics = await analyticsApi.getTaskAnalytics({
  projectId: 'xxx',
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});

// Productivity metrics
const productivity = await analyticsApi.getProductivityMetrics();
console.log(productivity.tasksCompletedToday);

// Trends
const trends = await analyticsApi.getTrends('daily');
```

### AI Features

```typescript
import { aiApi } from '@/lib';

// Get AI suggestions
const suggestions = await aiApi.getSuggestions({
  taskId: 'xxx',
  context: 'task'
});

// Analyze task
const analysis = await aiApi.analyzeTask({
  title: 'Build authentication system',
  description: 'Implement JWT-based auth',
  projectId: 'xxx'
});
console.log(analysis.complexity, analysis.estimatedHours);

// Generate description
const description = await aiApi.generateDescription(
  'Build user dashboard',
  'Project management app'
);

// Predict completion
const prediction = await aiApi.predictCompletion('task-id');
console.log(prediction.predictedDate, prediction.confidence);
```

### Notifications

```typescript
import { notificationApi } from '@/lib';
import { useNotifications } from '@/hooks';

// Using API directly
const notifications = await notificationApi.getNotifications();
const unread = await notificationApi.getUnreadNotifications();
await notificationApi.markAsRead(id);
await notificationApi.markAllAsRead();

// Using React Hook (with real-time updates)
function NotificationBell() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();

  return (
    <div>
      <span>Notifications ({unreadCount})</span>
      <button onClick={markAllAsRead}>Mark All Read</button>
      {notifications.map(notif => (
        <div key={notif._id} onClick={() => markAsRead(notif._id)}>
          {notif.title}
        </div>
      ))}
    </div>
  );
}
```

### Search

```typescript
import { searchApi } from '@/lib';

// Global search
const results = await searchApi.globalSearch('authentication', {
  type: 'task',
  limit: 10
});

// Search tasks
const tasks = await searchApi.searchTasks('bug fix', {
  projectId: 'xxx',
  status: 'todo'
});

// Search projects
const projects = await searchApi.searchProjects('mobile app');

// Get search suggestions
const suggestions = await searchApi.getSearchSuggestions('auth');
```

### WebSocket Real-time Updates

```typescript
import { useWebSocket } from '@/hooks';

function MyComponent() {
  const { on, send, isConnected, WS_EVENTS } = useWebSocket();

  useEffect(() => {
    // Listen for task updates
    const unsubscribe = on(WS_EVENTS.TASK_UPDATED, (task) => {
      console.log('Task updated:', task);
    });

    // Listen for new notifications
    on(WS_EVENTS.NOTIFICATION_NEW, (notification) => {
      console.log('New notification:', notification);
    });

    // Listen for user presence
    on(WS_EVENTS.USER_ONLINE, (user) => {
      console.log('User online:', user);
    });

    return unsubscribe;
  }, [on, WS_EVENTS]);

  // Send custom event
  const handleAction = () => {
    send('custom:event', { data: 'value' });
  };

  return (
    <div>
      Status: {isConnected() ? 'Connected' : 'Disconnected'}
    </div>
  );
}
```

## WebSocket Events

### Connection Events
- `connected` - WebSocket connected
- `disconnected` - WebSocket disconnected

### Task Events
- `task:created` - New task created
- `task:updated` - Task updated
- `task:deleted` - Task deleted
- `task:status_changed` - Task status changed

### Project Events
- `project:created` - New project created
- `project:updated` - Project updated
- `project:deleted` - Project deleted

### Notification Events
- `notification:new` - New notification received

### User Events
- `user:online` - User came online
- `user:offline` - User went offline
- `user:typing` - User is typing

### Comment Events
- `comment:added` - New comment added

## Error Handling

All API functions throw errors that can be caught:

```typescript
try {
  const project = await projectApi.createProject(data);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
    // Show error to user
  }
}
```

## TypeScript Types

All API clients export TypeScript interfaces:

```typescript
import type { 
  User, 
  Project, 
  Task, 
  Notification,
  DashboardStats,
  TaskAnalytics 
} from '@/lib';
```

## Environment Configuration

```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Testing Connection

Visit: http://localhost:3000/test-connection

This page will:
- Test backend connectivity
- Show API URL being used
- Display connection status
- Provide troubleshooting tips

## Best Practices

1. **Use Hooks for Components**: Use React hooks (`useProjects`, `useTasks`, etc.) in components for automatic real-time updates

2. **Use API Directly for One-off Operations**: Use API clients directly for one-time operations or in server components

3. **Handle Loading States**: Always handle loading and error states in your components

4. **WebSocket Connection**: The WebSocket connection is established automatically when using hooks and stays alive across the app

5. **Token Management**: The API client automatically handles JWT tokens in localStorage

6. **Error Handling**: Always wrap API calls in try-catch blocks

7. **Type Safety**: Use TypeScript types exported from `@/lib` for type safety

## Complete Example

```typescript
'use client';

import { useState } from 'react';
import { useProjects, useTasks, useNotifications } from '@/hooks';
import { projectApi, taskApi } from '@/lib';

export default function Dashboard() {
  const { projects, loading: projectsLoading } = useProjects();
  const { tasks, createTask } = useTasks();
  const { unreadCount } = useNotifications();
  const [creating, setCreating] = useState(false);

  const handleCreateTask = async () => {
    try {
      setCreating(true);
      await createTask({
        title: 'New Task',
        projectId: projects[0]._id,
        status: 'todo',
        priority: 'medium'
      });
      alert('Task created!');
    } catch (error) {
      alert('Failed to create task');
    } finally {
      setCreating(false);
    }
  };

  if (projectsLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Unread Notifications: {unreadCount}</p>
      <p>Projects: {projects.length}</p>
      <p>Tasks: {tasks.length}</p>
      <button onClick={handleCreateTask} disabled={creating}>
        Create Task
      </button>
    </div>
  );
}
```
