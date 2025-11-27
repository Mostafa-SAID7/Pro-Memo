/**
 * Alert component for notifications
 */

import { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'primary' | 'secondary';
  title?: string;
  onClose?: () => void;
  icon?: ReactNode;
  accent?: boolean;
}

export function Alert({
  children,
  variant = 'info',
  title,
  onClose,
  icon,
  accent = false,
}: AlertProps) {
  const variants = {
    info: {
      bg: 'bg-info-50 dark:bg-info-950/30',
      border: 'border-info-200 dark:border-info-800',
      text: 'text-info-800 dark:text-info-200',
      accent: 'bg-info-500',
      icon: 'ℹ️',
    },
    success: {
      bg: 'bg-success-50 dark:bg-success-950/30',
      border: 'border-success-200 dark:border-success-800',
      text: 'text-success-800 dark:text-success-200',
      accent: 'bg-success-500',
      icon: '✅',
    },
    warning: {
      bg: 'bg-warning-50 dark:bg-warning-950/30',
      border: 'border-warning-200 dark:border-warning-800',
      text: 'text-warning-800 dark:text-warning-200',
      accent: 'bg-warning-500',
      icon: '⚠️',
    },
    error: {
      bg: 'bg-error-50 dark:bg-error-950/30',
      border: 'border-error-200 dark:border-error-800',
      text: 'text-error-800 dark:text-error-200',
      accent: 'bg-error-500',
      icon: '❌',
    },
    primary: {
      bg: 'bg-primary-50 dark:bg-primary-950/30',
      border: 'border-primary-200 dark:border-primary-800',
      text: 'text-primary-800 dark:text-primary-200',
      accent: 'bg-primary-500',
      icon: '💡',
    },
    secondary: {
      bg: 'bg-secondary-50 dark:bg-secondary-950/30',
      border: 'border-secondary-200 dark:border-secondary-800',
      text: 'text-secondary-800 dark:text-secondary-200',
      accent: 'bg-secondary-500',
      icon: '✨',
    },
  };

  const style = variants[variant];

  return (
    <div
      className={`
        ${style.bg} ${style.border} ${style.text}
        border rounded-xl p-4
        flex items-start gap-3
        relative overflow-hidden
        animate-fade-in
      `}
    >
      {/* Accent bar */}
      {accent && (
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.accent}`} />
      )}
      
      {/* Icon */}
      <span className="text-xl flex-shrink-0">{icon || style.icon}</span>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-semibold mb-1">{title}</div>
        )}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
