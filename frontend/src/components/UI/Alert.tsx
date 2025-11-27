/**
 * Alert component for notifications
 */

import { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
  icon?: ReactNode;
}

export function Alert({
  children,
  variant = 'info',
  title,
  onClose,
  icon,
}: AlertProps) {
  const variants = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'ℹ',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-950',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: '✓',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-950',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: '⚠',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-950',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: '✕',
    },
  };

  const style = variants[variant];

  return (
    <div
      className={`
        ${style.bg} ${style.border} ${style.text}
        border rounded-lg p-4
        flex items-start gap-3
      `}
    >
      <span className="text-xl flex-shrink-0">
        {icon || style.icon}
      </span>
      <div className="flex-1">
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70"
        >
          ✕
        </button>
      )}
    </div>
  );
}
