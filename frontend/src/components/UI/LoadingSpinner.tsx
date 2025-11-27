/**
 * Reusable loading spinner component
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  fullScreen?: boolean;
  message?: string;
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary-500',
  fullScreen = false,
  message,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeClasses[size]} border-${color} border-t-transparent rounded-full animate-spin`}
      />
      {message && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export function LoadingButton({
  loading,
  children,
  ...props
}: {
  loading: boolean;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <button {...props} disabled={loading || props.disabled}>
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
