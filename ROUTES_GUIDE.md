# Pro Memo - Complete Routes Guide

## 📍 Frontend Routes (Next.js App Router)

### Public Routes (No Authentication Required)

#### 1. Homepage
- **Path**: `/`
- **File**: `frontend/src/app/page.tsx`
- **Type**: Server Component
- **Features**:
  - Landing page with hero section
  - Theme toggle (dark/light)
  - Language toggle (EN/AR)
  - CTA buttons to login/register
  - Feature showcase cards
- **Access**: http://localhost:3000

#### 2. Login Page
- **Path**: `/memo/login`
- **File**: `frontend/src/app/memo/login/page.tsx`
- **Type**: Client Component
- **Features**:
  - Email and password inputs
  - Form validation
  - Error messages
  - Link to register page
  - Redirects to dashboard on success
- **Access**: http://localhost:3000/memo/login

#### 3. Register Page
- **Path**: `/memo/register`
- **File**: `frontend/src/app/memo/register/page.tsx`
- **Type**: Client Component
- **Features**:
  - Name, email, password inputs
  - Password confirmation
  - Form validation
  - Error messages
  - Link to login page
  - Redirects to dashboard on success
- **Access**: http://localhost:3000/memo/register

---

### Protected Routes (Authentication Required)

#### 4. Dashboard
- **Path**: `/dashboard`
- **File**: `frontend/src/app/dashboard/page.tsx`
- **Type**: Client Component (Protected)
- **Protection**: `<ProtectedRoute>` wrapper
- **Features**:
  - User profile display
  - Welcome message
  - Logout button
  - Theme toggle
  - User statistics cards
- **Access**: http://localhost:3000/dashboard
- **Redirect**: Redirects to `/memo/login` if not authenticated

---

## 🔧 Backend API Routes (Express)

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: Set via `NEXT_PUBLIC_API_URL`

---

### Public API Endpoints

#### 1. Health Check
```
GET /
```
- **Description**: Basic API health check
- **Response**: "Pro Memo Backend API is running"
- **Auth**: None

#### 2. Detailed Health
```
GET /api/health
```
- **Description**: Detailed health status
- **Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-26T...",
  "uptime": 123.45,
  "environment": "development",
  "totalUsers": 5
}
```
- **Auth**: None

---

### Authentication Endpoints

#### 3. Register User
```
POST /api/auth/register
```
- **Description**: Create new user account
- **Auth**: None
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response** (201):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
- **Errors**:
  - 400: User already exists
  - 400: Validation errors

#### 4. Login User
```
POST /api/auth/login
```
- **Description**: Authenticate existing user
- **Auth**: None
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
- **Errors**:
  - 400: Invalid credentials
  - 400: Validation errors

---

### Protected API Endpoints (Require JWT Token)

#### 5. Get Current User
```
GET /api/auth/me
```
- **Description**: Get authenticated user's information
- **Auth**: Bearer Token (JWT)
- **Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- **Response** (200):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```
- **Errors**:
  - 401: No token provided
  - 401: Invalid token
  - 404: User not found

#### 6. Update Profile
```
PUT /api/auth/profile
```
- **Description**: Update user profile information
- **Auth**: Bearer Token (JWT)
- **Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- **Body**:
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```
- **Response** (200):
```json
{
  "id": 1,
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```
- **Errors**:
  - 400: Email already in use
  - 400: Validation errors
  - 401: Unauthorized
  - 404: User not found

#### 7. Change Password
```
POST /api/auth/change-password
```
- **Description**: Change user password
- **Auth**: Bearer Token (JWT)
- **Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- **Body**:
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```
- **Response** (200):
```json
{
  "message": "Password changed successfully"
}
```
- **Errors**:
  - 400: Current password incorrect
  - 400: Validation errors
  - 401: Unauthorized
  - 404: User not found

#### 8. Get All Users
```
GET /api/users
```
- **Description**: Get list of all users (for testing/admin)
- **Auth**: Bearer Token (JWT)
- **Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
- **Response** (200):
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-11-26T..."
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "createdAt": "2025-11-26T..."
  }
]
```
- **Errors**:
  - 401: Unauthorized

---

## 🔐 Authentication Flow

### Registration Flow
```
User → /memo/register
  ↓
Fill form (name, email, password)
  ↓
Submit → POST /api/auth/register
  ↓
Backend validates & creates user
  ↓
Returns JWT token
  ↓
Token stored in localStorage
  ↓
Redirect to /dashboard
```

### Login Flow
```
User → /memo/login
  ↓
Fill form (email, password)
  ↓
Submit → POST /api/auth/login
  ↓
Backend validates credentials
  ↓
Returns JWT token
  ↓
Token stored in localStorage
  ↓
Redirect to /dashboard
```

### Protected Route Access
```
User → /dashboard
  ↓
ProtectedRoute checks localStorage
  ↓
Token exists? → GET /api/auth/me
  ↓
Valid token? → Show dashboard
  ↓
Invalid/No token? → Redirect to /memo/login
```

---

## 📂 Route File Structure

```
frontend/src/app/
├── page.tsx                    # / (Homepage)
├── layout.tsx                  # Root layout
├── providers.tsx               # Context providers
├── memo/
│   ├── login/
│   │   └── page.tsx           # /memo/login
│   └── register/
│       └── page.tsx           # /memo/register
└── dashboard/
    └── page.tsx               # /dashboard (Protected)
```

---

## 🛠️ API Client Usage

### Frontend API Client
Located at: `frontend/src/lib/api.ts`

#### Register
```typescript
import { api } from '@/lib/api';

const response = await api.register(name, email, password);
// Token automatically stored
// Returns: { token, user }
```

#### Login
```typescript
import { api } from '@/lib/api';

const response = await api.login(email, password);
// Token automatically stored
// Returns: { token, user }
```

#### Get Current User
```typescript
import { api } from '@/lib/api';

const user = await api.getCurrentUser();
// Token automatically included
// Returns: { id, name, email }
```

#### Update Profile
```typescript
import { api } from '@/lib/api';

const user = await api.updateProfile(name, email);
// Returns: { id, name, email }
```

#### Change Password
```typescript
import { api } from '@/lib/api';

const result = await api.changePassword(currentPassword, newPassword);
// Returns: { message }
```

#### Logout
```typescript
import { api } from '@/lib/api';

api.logout();
// Removes token from localStorage
```

---

## 🎯 Route Protection

### Using ProtectedRoute Component
```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
```

### Using Auth Context
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, login, logout } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;
  
  return <div>Welcome {user.name}</div>;
}
```

---

## 🌐 Route Testing

### Test Public Routes
```bash
# Homepage
curl http://localhost:3000

# Login page
curl http://localhost:3000/memo/login

# Register page
curl http://localhost:3000/memo/register
```

### Test API Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get current user (with token)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📊 Route Summary

### Frontend Routes
| Route | Type | Auth | Description |
|-------|------|------|-------------|
| `/` | Public | No | Homepage |
| `/memo/login` | Public | No | Login page |
| `/memo/register` | Public | No | Register page |
| `/dashboard` | Protected | Yes | User dashboard |

### Backend Routes
| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/` | GET | No | Health check |
| `/api/health` | GET | No | Detailed health |
| `/api/auth/register` | POST | No | Register user |
| `/api/auth/login` | POST | No | Login user |
| `/api/auth/me` | GET | Yes | Get current user |
| `/api/auth/profile` | PUT | Yes | Update profile |
| `/api/auth/change-password` | POST | Yes | Change password |
| `/api/users` | GET | Yes | Get all users |

---

## 🔗 Quick Links

- **Homepage**: http://localhost:3000
- **Login**: http://localhost:3000/memo/login
- **Register**: http://localhost:3000/memo/register
- **Dashboard**: http://localhost:3000/dashboard
- **API Health**: http://localhost:5000/api/health

---

**Last Updated**: November 26, 2025
