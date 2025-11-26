/**
 * Error Utility Functions
 */

import { ApiError } from '@/types/errors';

/**
 * Parse API error response
 */
export function parseApiError(error: any): ApiError {
    // If it's already in our format
    if (error?.status && error?.message) {
        return error as ApiError;
    }

    // If it's a fetch error
    if (error?.response?.data) {
        return error.response.data as ApiError;
    }

    // If it's a network error
    if (error?.message === 'Network Error') {
        return {
            status: 'error',
            message: 'Network error. Please check your connection.',
            statusCode: 0,
        };
    }

    // Default error
    return {
        status: 'error',
        message: error?.message || 'An unexpected error occurred',
        statusCode: 500,
    };
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: any): string {
    const apiError = parseApiError(error);

    // If there are validation errors, return the first one
    if (apiError.errors && apiError.errors.length > 0) {
        return apiError.errors[0].message;
    }

    return apiError.message;
}

/**
 * Check if error is authentication error
 */
export function isAuthError(error: any): boolean {
    const apiError = parseApiError(error);
    return apiError.statusCode === 401;
}

/**
 * Check if error is authorization error
 */
export function isForbiddenError(error: any): boolean {
    const apiError = parseApiError(error);
    return apiError.statusCode === 403;
}

/**
 * Check if error is not found error
 */
export function isNotFoundError(error: any): boolean {
    const apiError = parseApiError(error);
    return apiError.statusCode === 404;
}

/**
 * Check if error is server error
 */
export function isServerError(error: any): boolean {
    const apiError = parseApiError(error);
    return apiError.statusCode ? apiError.statusCode >= 500 : false;
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: Array<{ field?: string; message: string }>): string {
    return errors.map(err => err.message).join(', ');
}
