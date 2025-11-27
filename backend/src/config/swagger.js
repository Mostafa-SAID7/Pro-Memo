/**
 * Swagger/OpenAPI Configuration
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pro Memo API',
      version: '1.0.0',
      description: 'A comprehensive project and task management API with real-time features',
      contact: {
        name: 'API Support',
        email: 'support@promemo.com',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['user', 'admin'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Project: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string', enum: ['planning', 'active', 'on-hold', 'completed', 'archived'] },
            priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
            owner: { $ref: '#/components/schemas/User' },
            members: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  user: { $ref: '#/components/schemas/User' },
                  role: { type: 'string' },
                },
              },
            },
            tags: { type: 'array', items: { type: 'string' } },
            color: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Task: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string', enum: ['todo', 'in-progress', 'review', 'done', 'blocked'] },
            priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
            project: { $ref: '#/components/schemas/Project' },
            assignee: { $ref: '#/components/schemas/User' },
            creator: { $ref: '#/components/schemas/User' },
            dueDate: { type: 'string', format: 'date-time' },
            estimatedHours: { type: 'number' },
            actualHours: { type: 'number' },
            tags: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            errors: { type: 'array', items: { type: 'object' } },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
