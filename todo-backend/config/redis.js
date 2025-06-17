// const Redis = require("ioredis");

// const redis = new Redis();

// module.exports=redis



// redisClient.js
const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL, // Full connection URL
  socket: {
    tls: true, // Most cloud services require TLS
    rejectUnauthorized: false // Needed for some providers
  }
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.connect()
  .then(() => console.log('Connected to Redis Cloud'))
  .catch(err => console.error('Redis connection failed:', err));

module.exports = redisClient;