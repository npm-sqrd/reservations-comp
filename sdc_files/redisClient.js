const redis = require('redis');

const redisClient = redis.createClient('redis://redis:6379');

redisClient.on('error', (err) => {
  console.error(err);
});

module.exports = redisClient;
