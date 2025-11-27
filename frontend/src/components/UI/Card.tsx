/**
 * Reusable card component with variants
 */

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
}: CardProps) {
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    bordered: 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700',
    flat: 'bg-gray-50 dark:bg-gray-900',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClass = hover
    ? 'transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer'
    : '';

  return (
    <div
      className={`
        rounded-xl
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hoverClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 dark:text-gray-100 ${className}`}>
      {children}
    </h3>
  );
}

export function CardContent({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}
