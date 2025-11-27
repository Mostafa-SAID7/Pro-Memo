'use client';

/**
 * Command Palette Component (Cmd+K)
 */

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search01Icon, FileIcon, TaskIcon, UserIcon, SettingsIcon } from 'hugeicons-react';
import { searchApi } from '@/lib/searchApi';

interface Command {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [commands, setCommands] = useState<Command[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const defaultCommands: Command[] = [
    {
      id: 'new-project',
      title: 'New Project',
      icon: <FileIcon className="w-5 h-5" />,
      action: () => router.push('/projects/new'),
      category: 'Actions',
    },
    {
      id: 'new-task',
      title: 'New Task',
      icon: <TaskIcon className="w-5 h-5" />,
      action: () => router.push('/tasks/new'),
      category: 'Actions',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <SettingsIcon className="w-5 h-5" />,
      action: () => router.push('/settings'),
      category: 'Navigation',
    },
  ];

  const searchCommands = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setCommands(defaultCommands);
      return;
    }

    try {
      const results = await searchApi.globalSearch(searchQuery, 'all', 10);
      
      const searchResults: Command[] = [
        ...results.projects.map(project => ({
          id: `project-${project._id}`,
          title: project.name,
          subtitle: project.description,
          icon: <FileIcon className="w-5 h-5" />,
          action: () => router.push(`/projects/${project._id}`),
          category: 'Projects',
        })),
        ...results.tasks.map(task => ({
          id: `task-${task._id}`,
          title: task.title,
          subtitle: task.project?.name,
          icon: <TaskIcon className="w-5 h-5" />,
          action: () => router.push(`/tasks/${task._id}`),
          category: 'Tasks',
        })),
        ...results.users.map(user => ({
          id: `user-${user._id}`,
          title: user.name,
          subtitle: user.email,
          icon: <UserIcon className="w-5 h-5" />,
          action: () => router.push(`/users/${user._id}`),
          category: 'Users',
        })),
      ];

      setCommands([...defaultCommands, ...searchResults]);
    } catch (error) {
      console.error('Search failed:', error);
      setCommands(defaultCommands);
    }
  }, [router, defaultCommands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % commands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + commands.length) % commands.length);
      } else if (e.key === 'Enter' && commands[selectedIndex]) {
        e.preventDefault();
        commands[selectedIndex].action();
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, commands, selectedIndex]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchCommands(query);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [query, isOpen, searchCommands]);

  useEffect(() => {
    if (isOpen) {
      setCommands(defaultCommands);
      setSelectedIndex(0);
    }
  }, [isOpen, defaultCommands]);

  if (!isOpen) return null;

  const groupedCommands = commands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <Search01Icon className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or type a command..."
            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">ESC</kbd>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto">
          {Object.entries(groupedCommands).map(([category, cmds]) => (
            <div key={category}>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                {category}
              </div>
              {cmds.map((cmd, index) => {
                const globalIndex = commands.indexOf(cmd);
                return (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      globalIndex === selectedIndex ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <div className="text-gray-600 dark:text-gray-400">{cmd.icon}</div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {cmd.title}
                      </div>
                      {cmd.subtitle && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {cmd.subtitle}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}

          {commands.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
              No results found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↵</kbd>
              Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">⌘K</kbd>
            or
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+K</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
