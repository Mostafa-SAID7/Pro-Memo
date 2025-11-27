# Components Directory Structure

This directory contains all reusable React components organized by functionality.

## 📁 Folder Structure

```
components/
├── UI/                    # Basic UI components
├── Layout/                # Layout and structure components
├── Forms/                 # Form inputs and controls
├── Navigation/            # Navigation and routing
├── Project/               # Project-related components
├── Task/                  # Task-related components
├── Analytics/             # Data visualization and analytics
├── Search/                # Search and filtering
├── AI/                    # AI-powered features
└── Charts/                # Chart components
```

## 🎨 UI Components (`/UI`)

Basic reusable UI components that form the foundation of the interface.

### Components:
- **Button** - Customizable button component with variants
- **Card** - Container component for content
- **Badge** - Small status indicators
- **Alert** - Alert and notification messages
- **Modal** - Dialog and modal windows
- **Tooltip** - Hover tooltips
- **Dropdown** - Dropdown menus
- **Skeleton** - Loading skeleton screens
- **LoadingSpinner** - Loading indicators
- **Progress** - Progress bars
- **EmptyState** - Empty state placeholders

### Usage:
```typescript
import { Button, Card, Modal } from '@/components/UI';

<Button variant="primary" size="lg">Click Me</Button>
<Card>Content here</Card>
<Modal isOpen={true} onClose={handleClose}>Modal content</Modal>
```

## 🏗️ Layout Components (`/Layout`)

Components for page layout and structure.

### Components:
- **Navbar** - Top navigation bar
- **Footer** - Page footer
- **ThemeToggle** - Dark/light mode toggle
- **LanguageToggle** - Language switcher
- **ScrollToTop** - Scroll to top button

### Usage:
```typescript
import { Navbar, Footer, ThemeToggle } from '@/components/Layout';

<Navbar />
<ThemeToggle />
<Footer />
```

## 📝 Form Components (`/Forms`)

Form inputs and controls.

### Components:
- **FormInput** - Text input with validation
- **Select** - Dropdown select
- **Textarea** - Multi-line text input
- **SearchInput** - Search input with icon

### Usage:
```typescript
import { FormInput, Select, Textarea } from '@/components/Forms';

<FormInput
  label="Name"
  value={name}
  onChange={setName}
  error={errors.name}
/>

<Select
  options={[{ value: '1', label: 'Option 1' }]}
  value={selected}
  onChange={setSelected}
/>
```

## 🧭 Navigation Components (`/Navigation`)

Navigation and routing related components.

### Components:
- **NotificationBell** - Notification dropdown
- **ProtectedRoute** - Route protection wrapper
- **ErrorBoundary** - Error boundary wrapper
- **ErrorPage** - Error page component
- **ExportImportMenu** - Export/import functionality

### Usage:
```typescript
import { ProtectedRoute, NotificationBell } from '@/components/Navigation';

<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

<NotificationBell />
```

## 📊 Project Components (`/Project`)

Project-related components.

### Components:
- **ProjectCard** - Project card display
- **ProjectHealthScore** - Project health indicator

### Usage:
```typescript
import { ProjectCard, ProjectHealthScore } from '@/components/Project';

<ProjectCard project={project} />
<ProjectHealthScore projectId={projectId} />
```

## ✅ Task Components (`/Task`)

Task-related components.

### Components:
- **TaskCard** - Task card display
- **TaskBoard** - Kanban board with drag & drop

### Usage:
```typescript
import { TaskCard, TaskBoard } from '@/components/Task';

<TaskCard task={task} />
<TaskBoard projectId={projectId} />
```

## 📈 Analytics Components (`/Analytics`)

Data visualization and analytics components.

### Components:
- **ActivityTimeline** - Activity feed timeline
- **DataTable** - Data table with sorting/filtering
- **Pagination** - Pagination controls
- **Tabs** - Tab navigation

### Usage:
```typescript
import { ActivityTimeline, DataTable } from '@/components/Analytics';

<ActivityTimeline projectId={projectId} />
<DataTable data={data} columns={columns} />
```

## 🔍 Search Components (`/Search`)

Search and filtering components.

### Components:
- **AdvancedSearch** - Advanced search with filters
- **CommandPalette** - Command palette (Cmd+K)

### Usage:
```typescript
import { AdvancedSearch, CommandPalette } from '@/components/Search';

<AdvancedSearch type="projects" onSearch={handleSearch} />
<CommandPalette />
```

## 🤖 AI Components (`/AI`)

AI-powered features and suggestions.

### Components:
- **SmartSuggestions** - AI-powered suggestions

### Usage:
```typescript
import { SmartSuggestions } from '@/components/AI';

<SmartSuggestions projectId={projectId} context="project" />
```

## 📊 Chart Components (`/Charts`)

Data visualization charts.

### Components:
- **PieChart** - Pie chart visualization
- **BarChart** - Bar chart visualization
- **LineChart** - Line chart visualization

### Usage:
```typescript
import { PieChart, BarChart, LineChart } from '@/components/Charts';

<PieChart 
  data={[{ name: 'Done', value: 10 }]}
  title="Task Distribution"
/>

<BarChart 
  data={[{ name: 'Project A', tasks: 5 }]}
  dataKeys={['tasks']}
/>

<LineChart 
  data={[{ name: '2024-01-01', completed: 5 }]}
  dataKeys={['completed']}
/>
```

## 🎯 Import Best Practices

### Option 1: Import from category
```typescript
import { Button, Card } from '@/components/UI';
import { TaskCard, TaskBoard } from '@/components/Task';
```

### Option 2: Import from root (recommended)
```typescript
import { Button, Card, TaskCard, TaskBoard } from '@/components';
```

### Option 3: Direct import (for tree-shaking)
```typescript
import { Button } from '@/components/UI/Button';
import { TaskCard } from '@/components/Task/TaskCard';
```

## 🔧 Component Guidelines

### Creating New Components

1. **Choose the right folder** based on component purpose
2. **Create the component file** with proper TypeScript types
3. **Export from index.ts** in the folder
4. **Add to root index.ts** if needed
5. **Document usage** in this README

### Component Template

```typescript
'use client';

/**
 * ComponentName
 * Brief description of what this component does
 */

import { useState } from 'react';

interface ComponentNameProps {
  // Props definition
  title: string;
  onAction?: () => void;
}

export function ComponentName({ title, onAction }: ComponentNameProps) {
  const [state, setState] = useState(false);

  return (
    <div className="component-wrapper">
      <h2>{title}</h2>
      {/* Component content */}
    </div>
  );
}
```

## 📝 Naming Conventions

- **PascalCase** for component names: `TaskCard`, `ProjectHealthScore`
- **camelCase** for props and functions: `onSearch`, `projectId`
- **kebab-case** for CSS classes: `task-card`, `project-health`
- **UPPER_CASE** for constants: `MAX_ITEMS`, `DEFAULT_LIMIT`

## 🎨 Styling Guidelines

- Use **Tailwind CSS** utility classes
- Support **dark mode** with `dark:` prefix
- Make components **responsive** with breakpoint prefixes
- Use **semantic colors** from theme

```typescript
<div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6">
  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
    Title
  </h2>
</div>
```

## ♿ Accessibility

- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation
- Support screen readers
- Maintain color contrast

```typescript
<button
  aria-label="Close modal"
  onClick={onClose}
  className="focus:ring-2 focus:ring-primary-500"
>
  <CloseIcon />
</button>
```

## 🧪 Testing

Each component should have:
- Unit tests for logic
- Integration tests for interactions
- Accessibility tests
- Visual regression tests

## 📚 Resources

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

**Last Updated**: November 27, 2025  
**Component Count**: 40+  
**Organization**: By functionality
