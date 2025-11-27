/**
 * Cache Middleware
 */

const redisClient = require('../infrastructure/cache/redis/client');

const cache = (duration = 300) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await redisClient.get(key);
      
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }

      // Store original send function
      const originalSend = res.json.bind(res);

      // Override send function
      res.json = (data) => {
        // Cache the response
        redisClient.setex(key, duration, JSON.stringify(data)).catch(err => {
          console.error('Cache set error:', err);
        });
        
        // Send response
        return originalSend(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

const clearCache = (pattern = '*') => {
  return async (req, res, next) => {
    try {
      const keys = await redisClient.keys(`cache:${pattern}`);
      if (keys.length > 0) {
        await redisClient.del(...keys);
      }
    } catch (error) {
      console.error('Clear cache error:', error);
    }
    next();
  };
};

module.exports = {
  cache,
  clearCache
};
