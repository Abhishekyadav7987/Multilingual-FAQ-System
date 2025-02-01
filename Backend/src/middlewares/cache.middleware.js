// Import the Redis client from the cache configuration
import { redisClient } from "../config/cache.config.js";

// Define the cache middleware function
export const cacheMiddleware = async (req, res, next) => {
  try {
    // Validate request objects
    if (!req || !res || typeof next !== "function") {
      console.error("Invalid request/response object in cacheMiddleware");
      return res?.status?.(500)?.json?.({ error: "Internal Server Error" });
    }

    // Check if the requested data is in the Redis cache
    const cachedData = await redisClient.get(req.originalUrl);
    if (cachedData) {
      console.log("Serving data from Redis cache");
      // If cached data is found, send it as the response
      return res.json(JSON.parse(cachedData));
    }
  } catch (error) {
    // Log any errors that occur during the cache lookup
    console.error("Redis Cache Error:", error);
  }

  // If no cached data is found, proceed to the next middleware or route handler
  next(); 
};
