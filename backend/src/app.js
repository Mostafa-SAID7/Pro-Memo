const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const { setupSwagger, specs } = require('./config/swagger');
const { FRONTEND_URL, NODE_ENV } = require('./config/env');
const {
  errorHandler,
  notFound,
  apiLimiter,
  sanitizeInput,
  securityHeaders,
  requestLogger,
  errorLogger
} = require('./api/middleware');

const app = express();

// CORS Configuration - Allow all origins in development
const corsOptions = {
  origin: NODE_ENV === 'development' 
    ? ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', FRONTEND_URL]
    : FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

app.use(cors(corsOptions));
app.use(helmet({
  contentSecurityPolicy: false, // Disable for Swagger UI
}));
app.use(securityHeaders);
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

// Request logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(requestLogger);
}

// Swagger UI at root path
const swaggerUiOptions = {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 30px 0 }
    .swagger-ui .info .title { color: #3b82f6; font-size: 2.5rem }
    .swagger-ui .scheme-container { background: #f8fafc; padding: 15px; border-radius: 8px }
    .swagger-ui .btn.authorize { background: #3b82f6; border-color: #3b82f6 }
    .swagger-ui .btn.authorize svg { fill: white }
    .swagger-ui .opblock.opblock-post { border-color: #10b981; background: rgba(16, 185, 129, 0.1) }
    .swagger-ui .opblock.opblock-get { border-color: #3b82f6; background: rgba(59, 130, 246, 0.1) }
    .swagger-ui .opblock.opblock-put { border-color: #f59e0b; background: rgba(245, 158, 11, 0.1) }
    .swagger-ui .opblock.opblock-delete { border-color: #ef4444; background: rgba(239, 68, 68, 0.1) }
    .swagger-ui .opblock.opblock-patch { border-color: #8b5cf6; background: rgba(139, 92, 246, 0.1) }
  `,
  customSiteTitle: 'Pro Memo API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
  },
};

// Serve Swagger UI at root
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(specs, swaggerUiOptions));

// API routes
app.use('/api', routes);

// 404 handler
app.use(notFound);

// Error logger
app.use(errorLogger);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
