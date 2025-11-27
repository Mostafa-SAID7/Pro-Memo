'use client';

import { useRouter } from 'next/navigation';
import { Globe02Icon } from 'hugeicons-react';

export function LanguageToggle({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-lg p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
      aria-label="Toggle language"
    >
      <Globe02Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      <span className="text-sm font-medium">{currentLocale === 'en' ? 'AR' : 'EN'}</span>
    </button>
  );
}
