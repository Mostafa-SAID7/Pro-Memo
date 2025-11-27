'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ErrorPageProps } from '@/types/errors';

const errorConfig = {
    400: {
        emoji: '⚠️',
        defaultTitle: 'Bad Request',
        defaultMessage: 'The request could not be understood by the server',
        gradient: 'from-yellow-500 to-orange-500',
    },
    401: {
        emoji: '🔒',
        defaultTitle: 'Unauthorized',
        defaultMessage: 'You need to be logged in to access this page',
        gradient: 'from-red-500 to-pink-500',
    },
    403: {
        emoji: '🚫',
        defaultTitle: 'Forbidden',
        defaultMessage: 'You don\'t have permission to access this resource',
        gradient: 'from-purple-500 to-pink-500',
    },
    404: {
        emoji: '🔍',
        defaultTitle: 'Page Not Found',
        defaultMessage: 'The page you\'re looking for doesn\'t exist',
        gradient: 'from-blue-500 to-cyan-500',
    },
    500: {
        emoji: '💥',
        defaultTitle: 'Server Error',
        defaultMessage: 'Something went wrong on our end',
        gradient: 'from-red-600 to-orange-600',
    },
};

export default function ErrorPage({
    statusCode,
    title,
    message,
    description,
    showHomeButton = true,
    showBackButton = true,
    customAction,
}: ErrorPageProps) {
    const router = useRouter();
    const t = useTranslations('errors');
    const config = errorConfig[statusCode];

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
            <div className="max-w-2xl w-full">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${config.gradient} opacity-10 blur-3xl rounded-full animate-pulse`}></div>
                    <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l ${config.gradient} opacity-10 blur-3xl rounded-full animate-pulse delay-1000`}></div>
                </div>

                {/* Error card */}
                <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                    {/* Gradient header */}
                    <div className={`h-2 bg-gradient-to-r ${config.gradient}`}></div>

                    <div className="p-8 md:p-12">
                        {/* Status code with emoji */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg">
                                <span className="text-5xl animate-bounce">{config.emoji}</span>
                            </div>
                            <div className={`text-8xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent mb-4`}>
                                {statusCode}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                                {title || config.defaultTitle}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                                {message || config.defaultMessage}
                            </p>
                            {description && (
                                <p className="text-sm text-gray-500 dark:text-gray-500 max-w-md mx-auto">
                                    {description}
                                </p>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                            {showBackButton && (
                                <button
                                    onClick={() => router.back()}
                                    className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    ← {t('goBack', { default: 'Go Back' })}
                                </button>
                            )}

                            {showHomeButton && (
                                <Link
                                    href="/"
                                    className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${config.gradient} hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-center`}
                                >
                                    🏠 {t('goHome', { default: 'Go Home' })}
                                </Link>
                            )}

                            {customAction && (
                                <Link
                                    href={customAction.href}
                                    className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-center"
                                >
                                    {customAction.label}
                                </Link>
                            )}
                        </div>

                        {/* Helpful links for 404 */}
                        {statusCode === 404 && (
                            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                                    {t('popularPages', { default: 'Popular pages you might be looking for:' })}
                                </p>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                        Home
                                    </Link>
                                    <Link href="/projects" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                        Projects
                                    </Link>
                                    <Link href="/about" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                        About
                                    </Link>
                                    <Link href="/contact" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer text */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-600 mt-8">
                    {t('needHelp', { default: 'Need help? Contact our support team.' })}
                </p>
            </div>
        </div>
    );
}
