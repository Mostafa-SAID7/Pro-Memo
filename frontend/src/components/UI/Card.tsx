/**
 * Reusable card component with variants
 */

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'flat' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
  glowColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'error';
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
  glow = false,
  glowColor = 'primary',
  onClick,
}: CardProps) {
  const variantClasses = {
    default: `
      bg-white dark:bg-neutral-800 
      border border-neutral-200 dark:border-neutral-700
    `,
    bordered: `
      bg-white dark:bg-neutral-800 
      border-2 border-neutral-300 dark:border-neutral-600
    `,
    elevated: `
      bg-white dark:bg-neutral-800 
      shadow-soft-lg 
      border border-neutral-100 dark:border-neutral-700
    `,
    flat: `
      bg-neutral-50 dark:bg-neutral-900
    `,
    glass: `
      bg-white/80 dark:bg-neutral-800/80 
      backdrop-blur-xl 
      border border-white/20 dark:border-neutral-700/50
      shadow-soft
    `,
    gradient: `
      bg-gradient-to-br from-white to-neutral-50 
      dark:from-neutral-800 dark:to-neutral-900
      border border-neutral-200/50 dark:border-neutral-700/50
      shadow-soft
    `,
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const glowClasses = {
    primary: 'shadow-glow-primary',
    secondary: 'shadow-glow-secondary',
    accent: 'shadow-glow-accent',
    success: 'shadow-glow-success',
    error: 'shadow-glow-error',
  };

  const hoverClass = hover
    ? `
      transition-all duration-300 ease-out
      hover:shadow-xl hover:-translate-y-1 
      hover:border-primary-200 dark:hover:border-primary-800
      cursor-pointer
    `
    : '';

  const glowClass = glow ? glowClasses[glowColor] : '';

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hoverClass}
        ${glowClass}
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
  gradient = false,
}: {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}) {
  return (
    <div
      className={`
        mb-4 pb-4 
        border-b border-neutral-200 dark:border-neutral-700
        ${gradient ? 'bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 -mx-6 -mt-6 px-6 pt-6 rounded-t-2xl' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = '',
  gradient = false,
}: {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}) {
  return (
    <h3
      className={`
        text-xl font-semibold 
        ${gradient ? 'bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent' : 'text-neutral-900 dark:text-neutral-100'}
        ${className}
      `}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-sm text-neutral-600 dark:text-neutral-400 mt-1 ${className}`}>
      {children}
    </p>
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
    <div
      className={`
        mt-4 pt-4 
        border-t border-neutral-200 dark:border-neutral-700 
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-2xl ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
