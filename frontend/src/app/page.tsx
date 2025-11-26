import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ArrowRight01Icon, UserIcon, ShieldKeyIcon } from 'hugeicons-react';
import Link from 'next/link';

export default async function Home() {
  const locale = await getLocale();
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-950 dark:via-blue-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-semibold">{t('common.appName')}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <LanguageToggle currentLocale={locale} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                {t('home.title')}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/memo/login"
              className="group flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              {t('home.getStarted')}
              <ArrowRight01Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/memo/register"
              className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl font-medium transition-all border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg"
            >
              {t('auth.signUp')}
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 pt-20">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4">
                <UserIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('auth.signIn')}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Secure authentication with JWT tokens
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4">
                <ShieldKeyIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Language</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Support for English and Arabic with RTL
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Microsoft Fluent inspired UI with dark mode
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
