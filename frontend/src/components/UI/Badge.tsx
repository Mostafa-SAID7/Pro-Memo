/**
 * Badge component for status indicators
 */

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  outline?: boolean;
  glow?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  outline = false,
  glow = false,
  className = '',
}: BadgeProps) {
  const solidVariants = {
    default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
    success: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400',
    warning: 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400',
    error: 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400',
    info: 'bg-info-100 dark:bg-info-900/30 text-info-700 dark:text-info-400',
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400',
    secondary: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400',
    accent: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400',
  };

  const outlineVariants = {
    default: 'border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 bg-transparent',
    success: 'border border-success-500 text-success-600 dark:text-success-400 bg-transparent',
    warning: 'border border-warning-500 text-warning-600 dark:text-warning-400 bg-transparent',
    error: 'border border-error-500 text-error-600 dark:text-error-400 bg-transparent',
    info: 'border border-info-500 text-info-600 dark:text-info-400 bg-transparent',
    primary: 'border border-primary-500 text-primary-600 dark:text-primary-400 bg-transparent',
    secondary: 'border border-secondary-500 text-secondary-600 dark:text-secondary-400 bg-transparent',
    accent: 'border border-accent-500 text-accent-600 dark:text-accent-400 bg-transparent',
  };

  const glowClasses = {
    default: '',
    success: 'shadow-glow-success',
    warning: '',
    error: 'shadow-glow-error',
    info: '',
    primary: 'shadow-glow-primary',
    secondary: 'shadow-glow-secondary',
    accent: 'shadow-glow-accent',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const roundedClass = rounded ? 'rounded-full' : 'rounded-md';
  const variantClasses = outline ? outlineVariants : solidVariants;
  const glowClass = glow ? glowClasses[variant] : '';

  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-medium
        transition-all duration-200
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${roundedClass}
        ${glowClass}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
