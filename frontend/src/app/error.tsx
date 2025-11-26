'use client';

import { useEffect } from 'react';
import ErrorPage from '@/components/ErrorPage';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <ErrorPage
            statusCode={500}
            title="Something Went Wrong"
            message="An unexpected error occurred"
            description={error.message}
            showHomeButton={true}
            showBackButton={false}
            customAction={{
                label: '🔄 Try Again',
                href: '#',
            }}
        />
    );
}
