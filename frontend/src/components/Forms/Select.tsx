/**
 * Custom select component
 */

import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <select
          ref={ref}
          className={`
            w-full px-4 py-2.5
            bg-white dark:bg-gray-800
            border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            rounded-lg
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2
            ${error ? 'focus:ring-red-500' : 'focus:ring-primary-500'}
            transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
