const redisClient = require("../cache/redisClient");

async function getFromCache(key) {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error fetching from cache:", error);
    throw error;
  }
}

async function setWithExpire(key, value, ttl = process.env.REDIS_TTL) {
  await redisClient.set(key, JSON.stringify(value), {
    EX: ttl,
  });
}

module.exports = {
  getFromCache,
  setWithExpire,
};
