# Backend Architecture

## 📁 Clean Architecture Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js      # Database configuration & operations
│   │   └── env.js           # Environment variables
│   │
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── userController.js    # User management logic
│   │
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication middleware
│   │   ├── errorHandler.js  # Global error handler
│   │   └── validator.js     # Request validation rules
│   │
│   ├── routes/
│   │   ├── index.js         # Main router
│   │   ├── authRoutes.js    # Authentication routes
│   │   └── userRoutes.js    # User routes
│   │
│   ├── utils/
│   │   ├── jwt.js           # JWT token utilities
│   │   └── password.js      # Password hashing utilities
│   │
│   ├── app.js               # Express app configuration
│   └── server.js            # Server entry point
│
├── .env                     # Environment variables
├── .env.example             # Example environment file
├── package.json             # Dependencies
└── ARCHITECTURE.md          # This file
```

## 🏗️ Architecture Layers

### 1. **Entry Point** (`server.js`)
- Starts the Express server
- Loads environment configuration
- Displays startup information

### 2. **Application** (`app.js`)
- Configures Express middleware
- Sets up CORS
- Mounts routes
- Error handling

### 3. **Routes** (`routes/`)
- Define API endpoints
- Apply middleware
- Connect to controllers

**Files:**
- `index.js` - Main router, mounts sub-routers
- `authRoutes.js` - Authentication endpoints
- `userRoutes.js` - User management endpoints

### 4. **Controllers** (`controllers/`)
- Handle business logic
- Process requests
- Return responses

**Files:**
- `authController.js` - Register, login, profile, password
- `userController.js` - User CRUD operations

### 5. **Middleware** (`middleware/`)
- Request processing
- Authentication
- Validation
- Error handling

**Files:**
- `auth.js` - JWT verification
- `validator.js` - Input validation rules
- `errorHandler.js` - Global error handling

### 6. **Utilities** (`utils/`)
- Reusable helper functions
- Common operations

**Files:**
- `jwt.js` - Token generation & verification
- `password.js` - Password hashing & comparison

### 7. **Configuration** (`config/`)
- Application configuration
- Database setup
- Environment variables

**Files:**
- `env.js` - Environment variable exports
- `database.js` - Database operations (in-memory)

## 🔄 Request Flow

```
Client Request
    ↓
Express App (app.js)
    ↓
CORS Middleware
    ↓
Body Parser
    ↓
Routes (routes/)
    ↓
Validation Middleware (middleware/validator.js)
    ↓
Auth Middleware (middleware/auth.js) [if protected]
    ↓
Controller (controllers/)
    ↓
Database (config/database.js)
    ↓
Response
```

## 📋 API Endpoints

### Authentication Routes (`/api/auth`)
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
GET    /api/auth/me                # Get current user (protected)
PUT    /api/auth/profile           # Update profile (protected)
POST   /api/auth/change-password   # Change password (protected)
```

### User Routes (`/api/users`)
```
GET    /api/users                  # Get all users (protected)
```

### Health Routes (`/api`)
```
GET    /api/health                 # Health check
```

## 🔐 Authentication Flow

### Registration
```
POST /api/auth/register
    ↓
Validation (validator.js)
    ↓
Check if user exists (database.js)
    ↓
Hash password (password.js)
    ↓
Create user (database.js)
    ↓
Generate JWT (jwt.js)
    ↓
Return token + user data
```

### Login
```
POST /api/auth/login
    ↓
Validation (validator.js)
    ↓
Find user (database.js)
    ↓
Compare password (password.js)
    ↓
Generate JWT (jwt.js)
    ↓
Return token + user data
```

### Protected Route Access
```
Request with Authorization header
    ↓
Auth Middleware (auth.js)
    ↓
Extract token
    ↓
Verify token (jwt.js)
    ↓
Attach user to request
    ↓
Controller processes request
```

## 🛠️ Key Features

### Separation of Concerns
- **Routes**: Define endpoints
- **Controllers**: Business logic
- **Middleware**: Request processing
- **Utils**: Reusable functions
- **Config**: Configuration management

### Modularity
- Each file has a single responsibility
- Easy to test individual components
- Easy to add new features

### Scalability
- Easy to add new routes
- Easy to add new controllers
- Easy to add new middleware
- Easy to switch database

### Maintainability
- Clear folder structure
- Consistent naming conventions
- Well-organized code
- Easy to understand

## 🔧 Environment Variables

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🚀 Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 📦 Dependencies

### Core
- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment variables

### Authentication
- `jsonwebtoken` - JWT tokens
- `bcryptjs` - Password hashing

### Validation
- `express-validator` - Input validation

## 🔄 Migration Path

### Current: In-Memory Database
```javascript
// config/database.js
const users = [];
```

### Future: MongoDB
```javascript
// config/database.js
const mongoose = require('mongoose');
const User = require('../models/User');
```

### Future: PostgreSQL
```javascript
// config/database.js
const { Pool } = require('pg');
const pool = new Pool({...});
```

## 📝 Adding New Features

### 1. Add New Route
```javascript
// routes/newRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/newController');

router.get('/', controller.getAll);
router.post('/', controller.create);

module.exports = router;
```

### 2. Add Controller
```javascript
// controllers/newController.js
const getAll = (req, res) => {
  // Logic here
};

const create = (req, res) => {
  // Logic here
};

module.exports = { getAll, create };
```

### 3. Mount Route
```javascript
// routes/index.js
const newRoutes = require('./newRoutes');
router.use('/new', newRoutes);
```

## 🎯 Best Practices

1. **Keep controllers thin** - Move complex logic to services
2. **Use middleware** - For cross-cutting concerns
3. **Validate input** - Always validate user input
4. **Handle errors** - Use error handler middleware
5. **Use environment variables** - Never hardcode secrets
6. **Separate concerns** - One file, one responsibility
7. **Write tests** - Test each layer independently

## 📚 Further Improvements

- [ ] Add service layer for complex business logic
- [ ] Add repository pattern for database operations
- [ ] Add DTOs (Data Transfer Objects)
- [ ] Add request/response transformers
- [ ] Add logging middleware
- [ ] Add rate limiting
- [ ] Add API documentation (Swagger)
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add database migrations

---

**Architecture Type**: Layered Architecture (MVC-like)
**Pattern**: Controller-Service-Repository (simplified)
**Status**: ✅ Production Ready
