/**
 * Enhanced form input component with validation
 */

import { InputHTMLAttributes, forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              w-full px-4 py-2.5 
              ${icon ? 'pl-10' : ''}
              bg-white dark:bg-gray-800 
              border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
              rounded-lg
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 
              ${error ? 'focus:ring-red-500' : 'focus:ring-primary-500'}
              transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
