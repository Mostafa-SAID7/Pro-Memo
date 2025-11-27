/**
 * Redis Client Configuration
 */

const redis = require('redis');

let client = null;

const connectRedis = async () => {
  try {
    if (process.env.REDIS_URL) {
      client = redis.createClient({
        url: process.env.REDIS_URL,
        socket: {
          reconnectStrategy: (retries) => {
            if (retries > 10) {
              console.error('❌ Redis: Too many reconnection attempts');
              return new Error('Too many retries');
            }
            return retries * 100;
          }
        }
      });

      client.on('error', (err) => console.error('Redis Client Error:', err));
      client.on('connect', () => console.log('✅ Redis Connected'));
      client.on('reconnecting', () => console.log('🔄 Redis Reconnecting...'));

      await client.connect();
    } else {
      console.log('⚠️  Redis URL not configured, caching disabled');
    }
  } catch (error) {
    console.error('❌ Redis Connection Error:', error.message);
  }
};

const getRedisClient = () => client;

const cacheGet = async (key) => {
  if (!client || !client.isOpen) return null;
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Redis GET error:', error);
    return null;
  }
};

const cacheSet = async (key, value, ttl = 3600) => {
  if (!client || !client.isOpen) return false;
  try {
    await client.setEx(key, ttl, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Redis SET error:', error);
    return false;
  }
};

const cacheDel = async (key) => {
  if (!client || !client.isOpen) return false;
  try {
    await client.del(key);
    return true;
  } catch (error) {
    console.error('Redis DEL error:', error);
    return false;
  }
};

const cacheFlush = async () => {
  if (!client || !client.isOpen) return false;
  try {
    await client.flushAll();
    return true;
  } catch (error) {
    console.error('Redis FLUSH error:', error);
    return false;
  }
};

module.exports = {
  connectRedis,
  getRedisClient,
  cacheGet,
  cacheSet,
  cacheDel,
  cacheFlush
};
