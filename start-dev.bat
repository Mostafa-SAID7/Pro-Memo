@echo off
echo Starting Pro Memo Development Environment...
echo.

REM Check if MongoDB is running
echo Checking MongoDB connection...
timeout /t 2 /nobreak > nul

REM Start Backend
echo Starting Backend Server...
start "Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul

REM Start Frontend
echo Starting Frontend Server...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ================================
echo Development servers starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ================================
echo.
echo Press any key to stop all servers...
pause > nul

REM Stop servers
taskkill /FI "WindowTitle eq Backend*" /T /F
taskkill /FI "WindowTitle eq Frontend*" /T /F
