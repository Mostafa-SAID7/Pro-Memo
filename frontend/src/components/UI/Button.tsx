/**
 * Enhanced button component with variants and states
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger' | 'success' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  glow = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    font-semibold rounded-xl 
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
  `;

  const variantClasses = {
    primary: `
      bg-primary-500 hover:bg-primary-600 
      text-white 
      focus:ring-primary-500 
      shadow-md hover:shadow-lg hover:shadow-primary-500/25
      dark:bg-primary-600 dark:hover:bg-primary-500
    `,
    secondary: `
      bg-secondary-500 hover:bg-secondary-600 
      text-white 
      focus:ring-secondary-500 
      shadow-md hover:shadow-lg hover:shadow-secondary-500/25
      dark:bg-secondary-600 dark:hover:bg-secondary-500
    `,
    accent: `
      bg-accent-500 hover:bg-accent-600 
      text-white 
      focus:ring-accent-500 
      shadow-md hover:shadow-lg hover:shadow-accent-500/25
      dark:bg-accent-600 dark:hover:bg-accent-500
    `,
    outline: `
      border-2 border-primary-500 
      text-primary-600 dark:text-primary-400
      hover:bg-primary-50 dark:hover:bg-primary-950/50 
      focus:ring-primary-500
    `,
    ghost: `
      text-neutral-700 dark:text-neutral-300 
      hover:bg-neutral-100 dark:hover:bg-neutral-800 
      focus:ring-neutral-500
    `,
    danger: `
      bg-error-500 hover:bg-error-600 
      text-white 
      focus:ring-error-500 
      shadow-md hover:shadow-lg hover:shadow-error-500/25
      dark:bg-error-600 dark:hover:bg-error-500
    `,
    success: `
      bg-success-500 hover:bg-success-600 
      text-white 
      focus:ring-success-500 
      shadow-md hover:shadow-lg hover:shadow-success-500/25
      dark:bg-success-600 dark:hover:bg-success-500
    `,
    gradient: `
      bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500
      hover:from-primary-600 hover:via-secondary-600 hover:to-accent-600
      text-white 
      focus:ring-primary-500 
      shadow-lg hover:shadow-xl
      bg-[length:200%_200%] hover:bg-right
      transition-all duration-500
    `,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const glowClasses = {
    primary: 'shadow-glow-primary',
    secondary: 'shadow-glow-secondary',
    accent: 'shadow-glow-accent',
    outline: '',
    ghost: '',
    danger: 'shadow-glow-error',
    success: 'shadow-glow-success',
    gradient: 'shadow-glow-primary',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const glowClass = glow ? glowClasses[variant] : '';

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${glowClass}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  );
}
