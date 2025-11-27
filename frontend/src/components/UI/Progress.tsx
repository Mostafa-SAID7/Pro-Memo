/**
 * Progress bar component
 */

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  className = '',
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    default: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm text-gray-600 dark:text-gray-400">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
