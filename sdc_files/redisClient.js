const redis = require('redis');

// const REDIS_HOST = 'redis://ec2-18-216-34-139.us-east-2.compute.amazonaws.com:6379';

// const redisClient = redis.createClient() || redis.createClient(REDIS_HOST);

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.error(err);
});

module.exports = redisClient;
