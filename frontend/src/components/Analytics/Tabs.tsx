/**
 * Tabs component for organizing content
 */

'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'line' | 'pills';
}

export function Tabs({ tabs, defaultTab, onChange, variant = 'line' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div
        className={`
          flex gap-1
          ${variant === 'line' ? 'border-b border-gray-200 dark:border-gray-700' : ''}
        `}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                relative px-4 py-2.5
                flex items-center gap-2
                font-medium text-sm
                transition-colors
                ${
                  variant === 'line'
                    ? isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    : isActive
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
                }
              `}
            >
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}

              {/* Active indicator for line variant */}
              {variant === 'line' && isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                  transition={{ type: 'spring', duration: 0.3 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTabContent}
        </motion.div>
      </div>
    </div>
  );
}
