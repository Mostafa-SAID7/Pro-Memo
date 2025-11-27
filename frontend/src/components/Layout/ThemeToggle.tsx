'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon01Icon, Sun03Icon } from 'hugeicons-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun03Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <Moon01Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
}
