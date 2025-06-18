// const Redis = require("ioredis");

// const redis = new Redis();

// module.exports=redis



const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    tls: true // Required for Redis Labs
  },
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.connect()
  .then(() => console.log('Connected to Redis Cloud'))
  .catch(err => console.error('Redis connection failed:', err));

module.exports = redisClient;