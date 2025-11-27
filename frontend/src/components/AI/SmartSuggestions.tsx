'use client';

/**
 * AI-Powered Smart Suggestions Component
 */

import { useState, useEffect } from 'react';
import { SparklesIcon, Cancel01Icon } from 'hugeicons-react';
import { Button } from './Button';

interface Suggestion {
  type: string;
  title: string;
  description: string;
  action?: () => void;
  priority: 'low' | 'medium' | 'high';
}

interface SmartSuggestionsProps {
  taskId?: string;
  projectId?: string;
  context?: 'task' | 'project' | 'dashboard';
}

export function SmartSuggestions({ taskId, projectId, context = 'dashboard' }: SmartSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadSuggestions();
  }, [taskId, projectId, context]);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (taskId) params.append('taskId', taskId);
      if (projectId) params.append('projectId', projectId);
      params.append('context', context);

      const response = await fetch(`/api/ai/suggestions?${params}`);
      const data = await response.json();
      setSuggestions(data.data || []);
    } catch (error) {
      console.error('Failed to load suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const dismissSuggestion = (index: number) => {
    setDismissed(prev => new Set(prev).add(suggestions[index].title));
  };

  const visibleSuggestions = suggestions.filter(s => !dismissed.has(s.title));

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-24"></div>
    );
  }

  if (visibleSuggestions.length === 0) {
    return null;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <SparklesIcon className="w-5 h-5 text-purple-500" />
        Smart Suggestions
      </div>

      {visibleSuggestions.map((suggestion, index) => (
        <div
          key={index}
          className={`border-l-4 rounded-lg p-4 ${getPriorityColor(suggestion.priority)}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                {suggestion.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {suggestion.description}
              </p>
              {suggestion.action && (
                <Button
                  onClick={suggestion.action}
                  size="sm"
                  className="mt-3"
                >
                  Apply Suggestion
                </Button>
              )}
            </div>
            <button
              onClick={() => dismissSuggestion(index)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Cancel01Icon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
