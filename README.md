# Pro Memo

A modern full-stack productivity platform with multi-language support, authentication, and beautiful UI inspired by Microsoft Fluent Design.

## ✨ Features

- 🎨 **Modern UI** - Microsoft Fluent-inspired design with Tailwind CSS
- 🌓 **Dark Mode** - Seamless theme switching
- 🌍 **Multi-Language** - Arabic & English support with RTL
- 🔐 **Authentication** - Secure JWT-based auth system
- 📱 **Responsive** - Works on all devices
- 🎯 **Icons** - Beautiful Hugeicons integration

## 🏗️ Project Structure

- **backend/** - Node.js Express API with JWT authentication
- **frontend/** - Next.js 16 with TypeScript, Tailwind CSS, and next-intl
- **ml/** - Machine learning components

## 🚀 Getting Started

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:5000`

**Environment Variables:**
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

**Features:**
- Auto-detects user language from browser
- Theme persistence with next-themes
- Protected routes with JWT
- Modern authentication pages

### ML Setup

```bash
cd ml
python ml.py
```

## 🛠️ Technologies Used

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **next-intl** - Internationalization
- **next-themes** - Dark mode
- **Hugeicons React** - Icon library

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### ML
- **Python** - Machine learning

## 📁 Key Files

- `frontend/messages/` - Translation files (en.json, ar.json)
- `frontend/src/i18n.ts` - Internationalization config
- `frontend/src/middleware.ts` - Locale detection
- `backend/.env` - Environment variables
- `backend/index.js` - API endpoints

## 🔑 API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

## 🎨 Color Theme

Primary color: Blue (#0067e6) with Microsoft-inspired gradients

## 📝 License

MIT
