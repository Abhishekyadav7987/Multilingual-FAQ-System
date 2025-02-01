// Import the Redis client creation function from the redis module
import { createClient } from "redis";
// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Create a Redis client instance with configuration options
export const redisClient = createClient({
  username: process.env.REDIS_USERNAME || "default", // Use default username if not provided
  password: process.env.REDIS_PASSWORD, // Use password from environment variables
  socket: {
    host: process.env.REDIS_URL, // Use Redis URL from environment variables
    port: Number(process.env.REDIS_PORT), // Use Redis port from environment variables
  },
});

// Handle Redis client error events
redisClient.on("error", (err) => console.error("Redis Client Error:", err));
// Handle Redis client connection events
redisClient.on("connect", () => console.log("Redis Connected Successfully"));

// Establish Redis connection before handling requests
await redisClient.connect().catch((err) => console.error("Redis Connection Failed:", err));
