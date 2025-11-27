# Pro Memo - Modern Project & Task Management Platform

Pro Memo is a comprehensive full-stack application for project and task management with real-time collaboration, advanced analytics, and modern UI/UX.

## ✨ Key Features

### 🚀 Real-Time Collaboration
- **WebSocket Integration** - Live updates for projects and tasks
- **User Presence** - See who's online and active
- **Typing Indicators** - Real-time collaboration feedback
- **Instant Notifications** - Get notified immediately of changes

### 🔍 Advanced Search & Filtering
- **Global Search** - Search across projects, tasks, and users
- **Advanced Filters** - Multi-criteria filtering with status, priority, dates
- **Search Suggestions** - Autocomplete and smart suggestions
- **Command Palette** - Quick navigation with Cmd+K

### 📊 Analytics & Reporting
- **Dashboard Overview** - Key metrics at a glance
- **Project Analytics** - Completion rates, time tracking, team performance
- **User Productivity** - Personal productivity metrics and trends
- **Visual Charts** - Pie charts, bar charts, and line graphs

### 📤 Export & Import
- **Multiple Formats** - CSV, Excel, and JSON export
- **Bulk Import** - Import tasks from CSV files
- **Data Backup** - Export all your data for backup

### ⚡ Bulk Operations
- **Bulk Updates** - Update multiple tasks at once
- **Bulk Assignment** - Assign multiple tasks to team members
- **Bulk Delete** - Clean up multiple items efficiently

### ⌨️ Keyboard Shortcuts
- `Cmd/Ctrl + K` - Command palette
- `Cmd/Ctrl + Shift + N` - New project
- `Cmd/Ctrl + Shift + T` - New task
- `Cmd/Ctrl + F` - Search
- `Esc` - Close modals

### 🎨 Modern UI/UX
- **Dark Mode** - Full dark mode support
- **Responsive Design** - Works on all devices
- **Internationalization** - English and Arabic support with RTL
- **Fluent Design** - Microsoft Fluent inspired interface
- **Smooth Animations** - Polished user experience

## 🏗️ Project Structure

```
Pro Memo/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Utility functions
│   │   ├── websocket.js # WebSocket server
│   │   ├── app.js       # Express app
│   │   └── server.js    # Server entry point
│   └── package.json
│
├── frontend/            # Next.js 16 + React 19
│   ├── src/
│   │   ├── app/        # Next.js app directory
│   │   ├── components/ # React components
│   │   ├── contexts/   # React contexts
│   │   ├── hooks/      # Custom hooks
│   │   ├── lib/        # API clients
│   │   └── utils/      # Utility functions
│   └── package.json
│
└── ml/                 # Python ML scripts
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose
- **Real-Time**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Documentation**: Swagger/OpenAPI
- **Export**: ExcelJS, CSV
- **Validation**: express-validator

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Hugeicons React
- **Real-Time**: Socket.IO Client
- **Internationalization**: next-intl
- **Theming**: next-themes
- **Drag & Drop**: @dnd-kit

### Machine Learning
- **Language**: Python

## 🚀 Quick Start

### Prerequisites
- Node.js v20 or later
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd pro-memo
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`
- API: `http://localhost:5000/api`
- WebSocket: `ws://localhost:5000`
- API Docs: `http://localhost:5000/api-docs`

### 3. Frontend Setup
```bash
cd frontend
npm install --legacy-peer-deps

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/promemo
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📚 API Documentation

Interactive API documentation is available at:
```
http://localhost:5000/api-docs
```

Features:
- Complete API reference
- Try out endpoints
- Request/response examples
- Authentication guide

## 🎯 Key Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Search
- `GET /api/search?q=query` - Global search
- `GET /api/search/projects` - Search projects
- `GET /api/search/tasks` - Search tasks

### Analytics
- `GET /api/analytics/dashboard` - Dashboard overview
- `GET /api/analytics/user` - User analytics
- `GET /api/analytics/project/:id` - Project analytics

### Export/Import
- `GET /api/export/projects/csv` - Export projects to CSV
- `GET /api/export/tasks/excel` - Export tasks to Excel
- `POST /api/export/tasks/csv` - Import tasks from CSV

### Bulk Operations
- `PUT /api/bulk/tasks/update` - Bulk update tasks
- `DELETE /api/bulk/tasks/delete` - Bulk delete tasks
- `PUT /api/bulk/tasks/assign` - Bulk assign tasks

## 🔐 Authentication

All protected endpoints require a JWT token:
```
Authorization: Bearer <your_jwt_token>
```

Get a token by registering or logging in.

## 📖 Documentation

- [Implementation Guide](./IMPLEMENTATION_GUIDE.md) - Detailed implementation guide
- [Enhancements](./ENHANCEMENTS.md) - List of all enhancements
- [Backend Architecture](./backend/ARCHITECTURE.md) - Backend architecture details

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚢 Deployment

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Socket.IO for real-time capabilities
- Recharts for beautiful charts
- Tailwind CSS for utility-first styling

---

**Built with ❤️ using modern web technologies**


---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+
- MongoDB 6+
- npm or yarn

### Setup & Installation

1. **Install Dependencies**
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

2. **Environment Configuration**

Backend `.env` is already configured with:
- PORT=5000
- MONGODB_URI=mongodb://localhost:27017/promemo
- JWT_SECRET and other required variables

Frontend `.env.local` is configured with:
- NEXT_PUBLIC_API_URL=http://localhost:5000

3. **Start Development Servers**

**Windows (Easy Start):**
```bash
start-dev.bat
```

**Manual Start:**
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm run dev
```

4. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api-docs
- Connection Test: http://localhost:3000/test-connection

### Verify Integration

Run the backend setup check:
```bash
cd backend
node setup-integration.js
```

Visit the connection test page:
http://localhost:3000/test-connection

## 📚 Documentation

- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Complete API integration guide
- [API Documentation](http://localhost:5000/api-docs) - Interactive Swagger docs

## 🔧 Troubleshooting

**Backend Issues:**
- Ensure MongoDB is running
- Run `node setup-integration.js` in backend folder
- Check `.env` file configuration

**Frontend Issues:**
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Visit http://localhost:3000/test-connection to test connection
- Check browser console for errors

**CORS Errors:**
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL (http://localhost:3000)
