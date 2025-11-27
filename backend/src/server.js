const app = require('./app');
const connectDB = require('./config/database');
const { PORT } = require('./config/env');

// Connect to MongoDB
connectDB();

// Start server
const server = app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ================================');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 API: http://localhost:${PORT}`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('🚀 ================================');
  console.log('');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
