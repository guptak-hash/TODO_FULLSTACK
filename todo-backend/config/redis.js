const redis = require('redis');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const redisConfig = isProduction 
  ? {
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        tls: true
      },
      username: process.env.REDIS_USER,
      password: process.env.REDIS_PASSWORD
    }
  : {
      socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379
      }
    };

const redisClient = redis.createClient(redisConfig);

redisClient.on('error', (err) => {
  console.error('Redis error:', err.message);
});

redisClient.connect()
  .then(() => console.log(`Connected to ${isProduction ? 'Redis Cloud' : 'local Redis'}`))
  .catch(err => console.error('Redis connection failed:', err));

module.exports = redisClient;