/**
 * Swagger Configuration
 * API Documentation setup
 */

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const specs = {
  openapi: '3.0.0',
  info: {
    title: 'Pro Memo API',
    version: '1.0.0',
    description: `
# Pro Memo API Documentation

A comprehensive project management and productivity platform API.

## Features
- 🔐 **Authentication** - JWT-based secure authentication
- � ***Projects** - Create and manage projects
- ✅ **Tasks** - Task management with status tracking
- 📊 **Analytics** - Productivity insights and metrics
- � ***Notifications** - Real-time notifications

## Authentication
Most endpoints require a Bearer token. Include it in the Authorization header:
\`\`\`
Authorization: Bearer <your_token>
\`\`\`
    `,
    contact: {
      name: 'Pro Memo Support',
      email: 'support@promemo.com',
    },
  },
  servers: [
    { url: 'http://localhost:5000', description: 'Development server' },
  ],
  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Projects', description: 'Project management' },
    { name: 'Tasks', description: 'Task management' },
    { name: 'Analytics', description: 'Analytics and metrics' },
    { name: 'Notifications', description: 'Notification management' },
  ],
  paths: {
    // ============ AUTH ENDPOINTS ============
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        description: 'Create a new user account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'John Doe' },
                  email: { type: 'string', format: 'email', example: 'john@example.com' },
                  password: { type: 'string', minLength: 6, example: 'password123' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'User registered successfully' },
                    data: {
                      type: 'object',
                      properties: {
                        token: { type: 'string' },
                        user: { $ref: '#/components/schemas/User' },
                      },
                    },
                  },
                },
              },
            },
          },
          400: { description: 'Validation error' },
          409: { description: 'Email already exists' },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        description: 'Authenticate user and get JWT token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'm.ssaid356@gmail.com' },
                  password: { type: 'string', example: 'Memo@3560' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Login successful' },
                    data: {
                      type: 'object',
                      properties: {
                        token: { type: 'string' },
                        user: { $ref: '#/components/schemas/User' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current user',
        description: 'Get the currently authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'User retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/auth/profile': {
      put: {
        tags: ['Auth'],
        summary: 'Update profile',
        description: 'Update current user profile',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Profile updated successfully' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/auth/change-password': {
      post: {
        tags: ['Auth'],
        summary: 'Change password',
        description: 'Change current user password',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['currentPassword', 'newPassword'],
                properties: {
                  currentPassword: { type: 'string' },
                  newPassword: { type: 'string', minLength: 6 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Password changed successfully' },
          401: { description: 'Current password is incorrect' },
        },
      },
    },
    // ============ PROJECT ENDPOINTS ============
    '/api/projects': {
      get: {
        tags: ['Projects'],
        summary: 'Get all projects',
        description: 'Get all projects for the current user',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['planning', 'active', 'on-hold', 'completed', 'archived'] } },
        ],
        responses: {
          200: { description: 'Projects retrieved successfully' },
          401: { description: 'Unauthorized' },
        },
      },
      post: {
        tags: ['Projects'],
        summary: 'Create project',
        description: 'Create a new project',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: { type: 'string', example: 'My Project' },
                  description: { type: 'string' },
                  status: { type: 'string', enum: ['planning', 'active', 'on-hold'], default: 'planning' },
                  priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
                  color: { type: 'string', example: '#3b82f6' },
                  tags: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Project created successfully' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/api/projects/{id}': {
      get: {
        tags: ['Projects'],
        summary: 'Get project by ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Project retrieved successfully' },
          404: { description: 'Project not found' },
        },
      },
      put: {
        tags: ['Projects'],
        summary: 'Update project',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Project' },
            },
          },
        },
        responses: {
          200: { description: 'Project updated successfully' },
          404: { description: 'Project not found' },
        },
      },
      delete: {
        tags: ['Projects'],
        summary: 'Delete project',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Project deleted successfully' },
          404: { description: 'Project not found' },
        },
      },
    },
    // ============ TASK ENDPOINTS ============
    '/api/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'Get all tasks',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'projectId', in: 'query', schema: { type: 'string' } },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['todo', 'in-progress', 'review', 'done', 'blocked'] } },
          { name: 'priority', in: 'query', schema: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] } },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          200: { description: 'Tasks retrieved successfully' },
        },
      },
      post: {
        tags: ['Tasks'],
        summary: 'Create task',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'project'],
                properties: {
                  title: { type: 'string', example: 'Implement feature' },
                  description: { type: 'string' },
                  project: { type: 'string', description: 'Project ID' },
                  status: { type: 'string', enum: ['todo', 'in-progress', 'review', 'done', 'blocked'], default: 'todo' },
                  priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
                  assignee: { type: 'string', description: 'User ID' },
                  dueDate: { type: 'string', format: 'date' },
                  tags: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Task created successfully' },
        },
      },
    },
    '/api/tasks/{id}': {
      get: {
        tags: ['Tasks'],
        summary: 'Get task by ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Task retrieved successfully' },
          404: { description: 'Task not found' },
        },
      },
      put: {
        tags: ['Tasks'],
        summary: 'Update task',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Task updated successfully' },
        },
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Delete task',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Task deleted successfully' },
        },
      },
    },
    '/api/tasks/{id}/status': {
      patch: {
        tags: ['Tasks'],
        summary: 'Update task status',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', enum: ['todo', 'in-progress', 'review', 'done', 'blocked'] },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Status updated successfully' },
        },
      },
    },
    // ============ ANALYTICS ENDPOINTS ============
    '/api/analytics/dashboard': {
      get: {
        tags: ['Analytics'],
        summary: 'Get dashboard stats',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Dashboard stats retrieved successfully' },
        },
      },
    },
    '/api/analytics/tasks': {
      get: {
        tags: ['Analytics'],
        summary: 'Get task analytics',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Task analytics retrieved successfully' },
        },
      },
    },
    '/api/analytics/productivity': {
      get: {
        tags: ['Analytics'],
        summary: 'Get productivity metrics',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Productivity metrics retrieved successfully' },
        },
      },
    },
    // ============ NOTIFICATION ENDPOINTS ============
    '/api/notifications': {
      get: {
        tags: ['Notifications'],
        summary: 'Get notifications',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Notifications retrieved successfully' },
        },
      },
    },
    '/api/notifications/{id}/read': {
      patch: {
        tags: ['Notifications'],
        summary: 'Mark notification as read',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Notification marked as read' },
        },
      },
    },
    // ============ HEALTH ENDPOINT ============
    '/api/health': {
      get: {
        tags: ['System'],
        summary: 'Health check',
        description: 'Check if the API is running',
        responses: {
          200: {
            description: 'API is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'healthy' },
                    timestamp: { type: 'string' },
                    uptime: { type: 'number' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
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
          id: { type: 'string' },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          role: { type: 'string', enum: ['user', 'admin'], example: 'user' },
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
          color: { type: 'string' },
          owner: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
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
          project: { type: 'string' },
          assignee: { type: 'string' },
          dueDate: { type: 'string', format: 'date' },
        },
      },
    },
  },
};

const setupSwagger = (app) => {
  // Swagger UI options
  const swaggerUiOptions = {
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin: 30px 0 }
      .swagger-ui .info .title { color: #3b82f6 }
      .swagger-ui .scheme-container { background: #f8fafc; padding: 15px; border-radius: 8px }
      .swagger-ui .btn.authorize { background: #3b82f6; border-color: #3b82f6 }
      .swagger-ui .btn.authorize svg { fill: white }
      .swagger-ui .opblock.opblock-post { border-color: #10b981; background: rgba(16, 185, 129, 0.1) }
      .swagger-ui .opblock.opblock-get { border-color: #3b82f6; background: rgba(59, 130, 246, 0.1) }
      .swagger-ui .opblock.opblock-put { border-color: #f59e0b; background: rgba(245, 158, 11, 0.1) }
      .swagger-ui .opblock.opblock-delete { border-color: #ef4444; background: rgba(239, 68, 68, 0.1) }
      .swagger-ui .opblock.opblock-patch { border-color: #8b5cf6; background: rgba(139, 92, 246, 0.1) }
    `,
    customSiteTitle: 'Pro Memo API Docs',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  };

  // Serve Swagger UI
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));
  
  // Serve raw OpenAPI spec
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  console.log('📚 Swagger docs available at /docs');
};

module.exports = { setupSwagger, specs };
