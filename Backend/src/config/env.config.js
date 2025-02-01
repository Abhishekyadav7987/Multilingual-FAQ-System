// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Export the configuration object containing environment variables
export const config = {
  // Server port number
  PORT: process.env.PORT || 4000,
  // MongoDB connection URI
  MONGODB_URI: process.env.MONGODB_URI,
  // Redis server URL
  REDIS_URL: process.env.REDIS_URL,
  // Redis username
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  // Redis password
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  // Redis server port number
  REDIS_PORT: process.env.REDIS_PORT,
  // Secret key for JWT
  JWT_SECRET: process.env.JWT_SECRET,
  // Allowed origin for CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN
};
