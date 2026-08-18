const { createClient } = require('redis');

const redisUrl = process.env.REDIS_URL;

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err.message);
});

async function connectRedis() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error('Failed to connect to Redis:', error.message);
  }
}

module.exports = {
  redisClient,
  connectRedis,
};
