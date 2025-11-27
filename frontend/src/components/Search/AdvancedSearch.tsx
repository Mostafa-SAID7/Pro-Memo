'use client';

/**
 * Advanced Search Component
 */

import { useState } from 'react';
import { Search01Icon, FilterIcon, Cancel01Icon } from 'hugeicons-react';
import { Button } from './Button';
import { Select } from './Select';

interface AdvancedSearchProps {
  onSearch: (filters: any) => void;
  type: 'projects' | 'tasks';
}

export function AdvancedSearch({ onSearch, type }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      status: 'all',
      priority: 'all',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  const statusOptions = type === 'projects' 
    ? [
        { value: 'all', label: 'All Status' },
        { value: 'planning', label: 'Planning' },
        { value: 'active', label: 'Active' },
        { value: 'on-hold', label: 'On Hold' },
        { value: 'completed', label: 'Completed' },
        { value: 'archived', label: 'Archived' },
      ]
    : [
        { value: 'all', label: 'All Status' },
        { value: 'todo', label: 'To Do' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'review', label: 'Review' },
        { value: 'done', label: 'Done' },
        { value: 'blocked', label: 'Blocked' },
      ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Created Date' },
    { value: 'updatedAt', label: 'Updated Date' },
    { value: 'name', label: 'Name' },
    { value: 'priority', label: 'Priority' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={`Search ${type}...`}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <FilterIcon className="w-5 h-5" />
          Filters
        </Button>
        <Button onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              options={statusOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <Select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              options={priorityOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sort By
            </label>
            <Select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              options={sortOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Order
            </label>
            <Select
              value={filters.sortOrder}
              onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
              options={[
                { value: 'asc', label: 'Ascending' },
                { value: 'desc', label: 'Descending' },
              ]}
            />
          </div>

          <div className="md:col-span-2 lg:col-span-4 flex gap-2">
            <Button onClick={handleSearch} className="flex-1">
              Apply Filters
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
              <Cancel01Icon className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
