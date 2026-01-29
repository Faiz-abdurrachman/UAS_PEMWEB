/**
 * Handle 404 Not Found errors
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: `Route ${req.method} ${req.originalUrl} not found`
        }
    });
};

/**
 * Global error handler middleware
 * Provides consistent error response format
 * @param {Error} err 
 * @param {import('express').Request} _req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} _next 
 */
export const errorHandler = (err, _req, res, _next) => {
    console.error('[Error]', err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: {
            code: err.code || 'INTERNAL_ERROR',
            message: statusCode === 500
                ? 'An unexpected error occurred'
                : message
        },
        // Only include stack trace in development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
