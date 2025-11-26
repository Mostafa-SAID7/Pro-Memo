'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global error:', error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-950">
                    <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 text-center border-2 border-red-200 dark:border-red-900">
                        <div className="text-8xl mb-6 animate-pulse">💥</div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Critical Error
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            A critical error occurred. Please refresh the page or contact support if the problem persists.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => reset()}
                                className="w-full px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                🔄 Try Again
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full px-8 py-4 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                            >
                                🏠 Go Home
                            </button>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
