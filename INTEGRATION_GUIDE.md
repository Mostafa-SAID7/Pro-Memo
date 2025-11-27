# Frontend-Backend Integration Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
node setup-integration.js  # Verify setup
npm start                   # Start backend on port 5000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev                 # Start frontend on port 3000
```

### 3. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api-docs
- Health Check: http://localhost:5000/api/v1/health

## Environment Configuration

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/promemo
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## API Endpoints

### Authentication
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - Login user
- GET `/api/v1/auth/me` - Get current user
- PUT `/api/v1/auth/profile` - Update profile
- POST `/api/v1/auth/change-password` - Change password

### Projects
- GET `/api/v1/projects` - Get all projects
- POST `/api/v1/projects` - Create project
- GET `/api/v1/projects/:id` - Get project by ID
- PUT `/api/v1/projects/:id` - Update project
- DELETE `/api/v1/projects/:id` - Delete project

### Tasks
- GET `/api/v1/tasks` - Get all tasks
- POST `/api/v1/tasks` - Create task
- GET `/api/v1/tasks/:id` - Get task by ID
- PUT `/api/v1/tasks/:id` - Update task
- DELETE `/api/v1/tasks/:id` - Delete task

### AI Features
- GET `/api/v1/ai/suggestions` - Get AI suggestions
- POST `/api/v1/ai/analyze-task` - Analyze task
- POST `/api/v1/ai/generate-description` - Generate description

### Analytics
- GET `/api/v1/analytics/dashboard` - Dashboard stats
- GET `/api/v1/analytics/tasks` - Task analytics
- GET `/api/v1/analytics/productivity` - Productivity metrics

## Frontend API Client Usage

```typescript
import { api } from '@/lib/api';

// Register
const response = await api.register(name, email, password);

// Login
const response = await api.login(email, password);

// Get current user
const user = await api.getCurrentUser();

// Check authentication
if (api.isAuthenticated()) {
  // User is logged in
}

// Logout
api.logout();
```

## WebSocket Integration

The backend includes WebSocket support for real-time features:

```javascript
const ws = new WebSocket('ws://localhost:5000');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};
```

## Testing the Integration

1. Start both servers
2. Open browser to http://localhost:3000
3. Try registering a new user
4. Login with credentials
5. Create a project
6. Create tasks

## Troubleshooting

### CORS Issues
- Ensure `FRONTEND_URL` in backend .env matches frontend URL
- Check browser console for CORS errors

### Connection Refused
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend .env.local

### Database Connection
- Ensure MongoDB is running
- Verify `MONGODB_URI` in backend .env

### Authentication Issues
- Check JWT_SECRET is set
- Verify token is being sent in Authorization header
