/**
 * Health Check Routes
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Health check - no auth required
router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Database health
router.get('/db', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    const dbStats = isConnected ? await mongoose.connection.db.stats() : null;
    
    res.json({
      status: isConnected ? 'healthy' : 'unhealthy',
      database: 'MongoDB',
      connected: isConnected,
      ...(dbStats && {
        collections: dbStats.collections,
        dataSize: dbStats.dataSize,
        storageSize: dbStats.storageSize
      })
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'MongoDB',
      error: error.message
    });
  }
});

// Memory health
router.get('/memory', (req, res) => {
  const memUsage = process.memoryUsage();
  res.json({
    status: 'healthy',
    memory: {
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB',
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + ' MB',
      external: Math.round(memUsage.external / 1024 / 1024) + ' MB',
      rss: Math.round(memUsage.rss / 1024 / 1024) + ' MB'
    }
  });
});

// Full system health
router.get('/full', async (req, res) => {
  const memUsage = process.memoryUsage();
  const dbConnected = mongoose.connection.readyState === 1;
  
  res.json({
    status: dbConnected ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    database: {
      status: dbConnected ? 'connected' : 'disconnected',
      type: 'MongoDB'
    },
    memory: {
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB',
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + ' MB'
    },
    node: {
      version: process.version,
      platform: process.platform
    }
  });
});

module.exports = router;
