const app = require('./app');
const connectDB = require('./config/database');
const { PORT } = require('./config/env');
const scheduler = require('./utils/scheduler');
const backup = require('./utils/backup');
const { initializeWebSocket } = require('./websocket');
const http = require('http');

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket
initializeWebSocket(server);

// Start server
server.listen(PORT, () => {
  console.log('');
  console.log('🚀 ================================');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 API: http://localhost:${PORT}`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('🚀 ================================');
  console.log('');

  // Schedule automated tasks
  if (process.env.NODE_ENV === 'production') {
    // Daily backup at 2 AM
    scheduler.schedule('daily-backup', 24 * 60 * 60 * 1000, async () => {
      await backup.createBackup();
      await backup.deleteOldBackups(7);
    });
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  scheduler.cancelAll();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
