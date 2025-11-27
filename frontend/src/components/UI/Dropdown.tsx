/**
 * Dropdown menu component
 */

'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, children, align = 'left', className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignClass = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute ${alignClass} mt-2 z-50
              min-w-[200px]
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-lg
              shadow-lg
              py-2
            `}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  icon,
  danger = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full px-4 py-2.5
        flex items-center gap-3
        text-left text-sm
        transition-colors
        ${
          danger
            ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }
      `}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className="my-1 border-t border-gray-200 dark:border-gray-700" />;
}
