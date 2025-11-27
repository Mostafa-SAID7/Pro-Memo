const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const { FRONTEND_URL } = require('./config/env');
const swaggerSpec = require('./config/swagger');
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

// CORS Configuration
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.use(helmet());
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

// Root route
app.get('/', (req, res) => {
  res.send('Pro Memo Backend API is running');
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Pro Memo API Documentation',
}));

// API routes
app.use('/api', routes);

// 404 handler
app.use(notFound);

// Error logger
app.use(errorLogger);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
