/**
 * Health Check Routes
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

router.get('/db', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const isConnected = mongoose.connection.readyState === 1;
    
    res.json({
      status: isConnected ? 'healthy' : 'unhealthy',
      database: 'MongoDB',
      connected: isConnected
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

module.exports = router;
