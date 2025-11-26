# Pro Memo - Quick Start Guide

## 🚀 Start Development

### Terminal 1 - Backend
```bash
cd backend
npm start
```
✅ Backend running on: **http://localhost:5000**

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
✅ Frontend running on: **http://localhost:3000**

## 📱 Test the App

1. **Homepage**: http://localhost:3000
   - Click theme toggle (sun/moon icon)
   - Click language toggle (globe icon)
   
2. **Register**: http://localhost:3000/memo/register
   - Create a new account
   - Auto-redirects to dashboard
   
3. **Login**: http://localhost:3000/memo/login
   - Login with your credentials
   - Access protected dashboard
   
4. **Dashboard**: http://localhost:3000/dashboard
   - View your profile
   - Logout functionality

## 🎨 Features

✅ **Multi-Language** (EN/AR with RTL)
✅ **Dark/Light Theme**
✅ **JWT Authentication**
✅ **Modern UI** (Microsoft Fluent-inspired)
✅ **Responsive Design**
✅ **Hugeicons Integration**

## 📂 Key Routes

- `/` - Homepage
- `/memo/login` - Login page
- `/memo/register` - Register page
- `/dashboard` - Protected dashboard

## 🔐 API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

## 🌍 Language Support

- **English** (default)
- **Arabic** (with RTL layout)
- Auto-detects from browser settings
- Manual toggle available

## 🎯 Next Steps

1. Test registration and login
2. Try theme switching
3. Try language switching
4. Check dashboard functionality
5. Ready to push to GitHub!

## 📤 Push to GitHub

```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

---

**Status**: ✅ Ready to Run
**Last Updated**: November 26, 2025
