const Redis = require("ioredis");
require('dotenv').config();

let redisClient;

if (process.env.NODE_ENV !== 'production') {
  // Local development configuration
  redisClient = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    }
  });

  redisClient.on('connect', () => {
    console.log('Connected to local Redis');
  });

  redisClient.on('error', (err) => {
    console.error('Local Redis error:', err.message);
  });
} else {
  // Production mock (Render)
  redisClient = {
    get: async () => null,
    set: async () => 'OK',
    del: async () => 1,
    on: () => {},
    quit: async () => {}
  };
  console.log('Running in production - Redis disabled');
}

module.exports = redisClient;