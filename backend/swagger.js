const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pro Memo API',
            version: '1.0.0',
            description: 'Pro Memo Backend API Documentation with comprehensive error handling',
            contact: {
                name: 'Pro Memo Team',
                email: 'support@promemo.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
            {
                url: 'https://api.promemo.com',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'User ID',
                        },
                        name: {
                            type: 'string',
                            description: 'User full name',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                        },
                    },
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string',
                            description: 'JWT authentication token',
                        },
                        user: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            enum: ['fail', 'error'],
                            description: 'Error status',
                        },
                        message: {
                            type: 'string',
                            description: 'Error message',
                        },
                        statusCode: {
                            type: 'integer',
                            description: 'HTTP status code',
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    field: {
                                        type: 'string',
                                    },
                                    message: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
                ValidationError: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'fail',
                        },
                        message: {
                            type: 'string',
                            example: 'Validation failed',
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    msg: {
                                        type: 'string',
                                    },
                                    param: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                UnauthorizedError: {
                    description: 'Authentication required',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error',
                            },
                            example: {
                                status: 'fail',
                                message: 'No token, authorization denied',
                                statusCode: 401,
                            },
                        },
                    },
                },
                ForbiddenError: {
                    description: 'Access forbidden',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error',
                            },
                            example: {
                                status: 'fail',
                                message: 'Access forbidden',
                                statusCode: 403,
                            },
                        },
                    },
                },
                NotFoundError: {
                    description: 'Resource not found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error',
                            },
                            example: {
                                status: 'fail',
                                message: 'Resource not found',
                                statusCode: 404,
                            },
                        },
                    },
                },
                ValidationError: {
                    description: 'Validation error',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ValidationError',
                            },
                        },
                    },
                },
                ServerError: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error',
                            },
                            example: {
                                status: 'error',
                                message: 'Internal server error',
                                statusCode: 500,
                            },
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: 'Authentication',
                description: 'User authentication endpoints',
            },
            {
                name: 'Users',
                description: 'User management endpoints',
            },
        ],
    },
    apis: ['./index.js', './routes/*.js'], // Path to the API routes
};

module.exports = swaggerJsdoc(options);
