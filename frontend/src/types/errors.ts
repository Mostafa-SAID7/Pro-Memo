/**
 * Error Type Definitions
 */

export interface ApiError {
    status: 'fail' | 'error';
    message: string;
    statusCode?: number;
    errors?: Array<{
        field?: string;
        message: string;
    }>;
}

export interface ErrorPageProps {
    statusCode: 400 | 401 | 403 | 404 | 500;
    title?: string;
    message?: string;
    description?: string;
    showHomeButton?: boolean;
    showBackButton?: boolean;
    customAction?: {
        label: string;
        href: string;
    };
}

export type ErrorBoundaryState = {
    hasError: boolean;
    error: Error | null;
};
