# Backend Structure Documentation

## Directory Organization

```
backend/src/
├── api/                          # API Layer
│   ├── controllers/              # Request handlers (organized by feature)
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── users/
│   │   ├── analytics/
│   │   ├── ai/
│   │   ├── admin/
│   │   ├── search/
│   │   ├── export/
│   │   ├── bulk/
│   │   ├── activities/
│   │   └── notifications/
│   └── routes/                   # API routes
│       └── v1/                   # API version 1
│           ├── index.js          # Main router
│           ├── auth.routes.js
│           ├── project.routes.js
│           ├── task.routes.js
│           ├── user.routes.js
│           ├── analytics.routes.js
│           ├── ai.routes.js
│           ├── admin.routes.js
│           ├── search.routes.js
│           ├── export.routes.js
│           ├── bulk.routes.js
│           ├── activity.routes.js
│           ├── notification.routes.js
│           └── health.routes.js
│
├── middleware/                   # All middleware (consolidated)
│   ├── auth.middleware.js        # Authentication & authorization
│   ├── validation.middleware.js  # Request validation
│   ├── error.middleware.js       # Error handling
│   ├── security.middleware.js    # Security (rate limiting, sanitization)
│   ├── logger.middleware.js      # Request/error logging
│   ├── cache.middleware.js       # Redis caching
│   ├── upload.middleware.js      # File upload handling
│   └── index.js                  # Middleware exports
│
├── core/                         # Business Logic Layer
│   ├── models/                   # Mongoose models
│   │   ├── user/
│   │   ├── project/
│   │   ├── task/
│   │   └── system/
│   └── services/                 # Business logic services
│       ├── auth/
│       └── notification/
│
├── infrastructure/               # External Services Layer
│   ├── cache/                    # Redis caching
│   │   └── redis/
│   ├── database/                 # MongoDB connection
│   │   └── mongodb/
│   ├── email/                    # Email service
│   │   └── templates/
│   ├── storage/                  # File storage
│   ├── websocket/                # WebSocket server
│   ├── scheduler/                # Task scheduler
│   └── backup/                   # Database backup
│
├── shared/                       # Shared Utilities
│   ├── constants/                # Application constants
│   ├── errors/                   # Custom error classes
│   └── utils/                    # Helper functions
│
├── config/                       # Configuration
│   ├── env.js                    # Environment variables
│   ├── database.js               # Database config
│   └── swagger.js                # API documentation
│
├── app.js                        # Express app setup
├── server.js                     # Server entry point
├── routes.js                     # Main routes export
└── websocket.js                  # WebSocket export
```

## Middleware Organization

All middleware is now consolidated in `/src/middleware/` with clear responsibilities:

### auth.middleware.js
- `protect`: Verify JWT token and attach user to request
- `restrictTo(...roles)`: Role-based access control
- `optionalAuth`: Optional authentication for public/private routes

### validation.middleware.js
- `validate`: Express-validator error handler
- `validators`: All validation rules (auth, projects, tasks, etc.)

### error.middleware.js
- `errorHandler`: Global error handler
- `notFound`: 404 handler

### security.middleware.js
- `sanitizeInput`: XSS protection
- `securityHeaders`: Security headers
- `apiLimiter`: General API rate limiting (100 req/15min)
- `authLimiter`: Auth endpoint rate limiting (5 req/15min)
- `strictLimiter`: Strict rate limiting for sensitive operations (10 req/15min)

### logger.middleware.js
- `requestLogger`: Log all requests with timing
- `errorLogger`: Log errors with stack traces

### cache.middleware.js
- `cache(duration)`: Cache GET responses in Redis
- `clearCache(pattern)`: Clear cache by pattern

### upload.middleware.js
- `uploadSingle`: Single file upload
- `uploadMultiple`: Multiple files upload
- `uploadFields`: Multiple fields with files

## API Routes Structure

### Route Organization
- All routes are in `/src/api/routes/v1/`
- Each feature has its own route file
- Routes use consolidated middleware from `/src/middleware/`

### Middleware Usage in Routes

```javascript
const { protect, validators, validate, cache, clearCache, strictLimiter } = require('../../../middleware');

// Protected route with validation
router.post('/', protect, validators.createProject, validate, clearCache('projects*'), controller.create);

// Cached route
router.get('/', protect, cache(300), controller.getAll);

// Rate-limited route
router.post('/ai/analyze', protect, strictLimiter, controller.analyze);
```

## API Endpoints

### Authentication (`/api/v1/auth`)
- POST `/register` - Register new user (rate-limited)
- POST `/login` - Login user (rate-limited)
- GET `/me` - Get current user (protected)
- PUT `/profile` - Update profile (protected)
- POST `/change-password` - Change password (protected)
- POST `/logout` - Logout (protected)
- POST `/refresh-token` - Refresh JWT token (protected)

### Projects (`/api/v1/projects`)
- GET `/` - Get all projects (protected, cached)
- POST `/` - Create project (protected, validated, clears cache)
- GET `/:id` - Get project by ID (protected, cached)
- PUT `/:id` - Update project (protected, validated, clears cache)
- DELETE `/:id` - Delete project (protected, clears cache)
- GET `/:id/tasks` - Get project tasks (protected, cached)
- GET `/:id/analytics` - Get project analytics (protected, cached)

### Tasks (`/api/v1/tasks`)
- GET `/` - Get all tasks (protected, cached)
- POST `/` - Create task (protected, validated, clears cache)
- GET `/:id` - Get task by ID (protected, cached)
- PUT `/:id` - Update task (protected, validated, clears cache)
- DELETE `/:id` - Delete task (protected, clears cache)
- PATCH `/:id/status` - Update task status (protected)
- PATCH `/:id/priority` - Update task priority (protected)
- POST `/:id/comments` - Add comment (protected)
- GET `/:id/comments` - Get comments (protected)

### Analytics (`/api/v1/analytics`)
- GET `/dashboard` - Dashboard stats (protected, cached 10min)
- GET `/tasks` - Task analytics (protected, cached 10min)
- GET `/projects` - Project analytics (protected, cached 10min)
- GET `/productivity` - Productivity metrics (protected, cached 10min)
- GET `/trends` - Trends data (protected, cached 10min)

### AI Features (`/api/v1/ai`)
- GET `/suggestions` - Get AI suggestions (protected, rate-limited)
- POST `/analyze-task` - Analyze task (protected, rate-limited)
- POST `/generate-description` - Generate description (protected, rate-limited)
- POST `/predict-completion` - Predict completion (protected, rate-limited)
- POST `/smart-categorize` - Smart categorize (protected, rate-limited)

### Search (`/api/v1/search`)
- GET `/` - Global search (protected)
- GET `/tasks` - Search tasks (protected)
- GET `/projects` - Search projects (protected)
- GET `/suggestions` - Search suggestions (protected)

### Notifications (`/api/v1/notifications`)
- GET `/` - Get all notifications (protected)
- GET `/unread` - Get unread notifications (protected)
- PATCH `/:id/read` - Mark as read (protected)
- PATCH `/read-all` - Mark all as read (protected)
- DELETE `/:id` - Delete notification (protected)

### Export (`/api/v1/export`)
- POST `/tasks` - Export tasks (protected, rate-limited)
- POST `/projects` - Export projects (protected, rate-limited)
- POST `/analytics` - Export analytics (protected, rate-limited)
- GET `/download/:id` - Download export (protected)

### Bulk Operations (`/api/v1/bulk`)
- POST `/tasks/create` - Bulk create tasks (protected, rate-limited, clears cache)
- PATCH `/tasks/update` - Bulk update tasks (protected, rate-limited, clears cache)
- DELETE `/tasks/delete` - Bulk delete tasks (protected, rate-limited, clears cache)
- PATCH `/tasks/status` - Bulk update status (protected, rate-limited, clears cache)
- POST `/import` - Import data (protected, rate-limited, clears cache)

### Admin (`/api/v1/admin`)
- GET `/users` - Get all users (admin only)
- GET `/stats` - System stats (admin only)
- POST `/backup` - Create backup (admin only)
- GET `/logs` - Get logs (admin only)
- DELETE `/users/:id` - Delete user (admin only)
- PATCH `/users/:id/role` - Update user role (admin only)

### Health (`/api/v1/health`)
- GET `/` - Health check (public)
- GET `/db` - Database health (public)

## Features

### Caching Strategy
- Analytics endpoints: 10 minutes cache
- Projects list: 5 minutes cache
- Tasks list: 3 minutes cache
- Individual resources: 3 minutes cache
- Cache cleared on mutations (create, update, delete)

### Rate Limiting
- General API: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes
- AI/Export/Bulk: 10 requests per 15 minutes

### Security
- JWT authentication
- Role-based access control
- Input sanitization
- XSS protection
- Security headers (Helmet)
- CORS configuration

### Real-time Features
- WebSocket server for live updates
- Task/Project change notifications
- User presence tracking
- Typing indicators

### Validation
- All inputs validated using express-validator
- MongoDB ID validation
- Email validation
- Date format validation
- Enum validation for status/priority

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/promemo
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```
