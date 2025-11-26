/**
 * Global Error Handler Middleware
 * Catches and formats all errors in the application
 */

const { AppError } = require('../errors');

// Development error response
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
        ...(err.errors && { errors: err.errors })
    });
};

// Production error response
const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            ...(err.errors && { errors: err.errors })
        });
    } else {
        // Programming or unknown error: don't leak error details
        console.error('ERROR 💥', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
    }
};

// Handle JWT errors
const handleJWTError = () =>
    new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
    new AppError('Your token has expired! Please log in again.', 401);

// Handle validation errors
const handleValidationError = (err) => {
    const errors = err.errors || [];
    return new AppError('Validation failed', 400, true, errors);
};

// Main error handler middleware
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;
        error.name = err.name;
        error.isOperational = err.isOperational;

        // Handle specific error types
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
        if (error.name === 'ValidationError') error = handleValidationError(error);

        sendErrorProd(error, res);
    } else {
        // Default to development mode
        sendErrorDev(err, res);
    }
};

// Async error wrapper
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

module.exports = {
    errorHandler,
    catchAsync
};
