const { createClient } = require("redis");

const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

(async () => {
  await redisClient.connect();

  // Error handling
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
})();

module.exports = redisClient;
