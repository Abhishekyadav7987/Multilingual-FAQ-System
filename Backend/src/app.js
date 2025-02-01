// Import necessary modules and middleware
import express from "express";
import connectDB from "./config/db.config.js";
import { cacheMiddleware } from "./middlewares/cache.middleware.js";
import faqRoutes from "./routes/faq.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

// Create an Express application instance
const app = express();

// Connect to the database
connectDB();

// Middleware
// Use cache middleware for caching responses
app.use(cacheMiddleware);
// Parse incoming JSON requests
app.use(express.json());
// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Error Handling Middleware
app.use(errorHandler);

// Home Route
// Define a route for the home page
app.get("/", (req, res) => {
    res.json({
      message: "Welcome to the FAQ Management API!",
      documentation: "Visit /api/faqs to access FAQs.",
      status: "API is running smoothly...",
  });
});

// Routes
// Define routes for FAQ management with caching
app.use("/api/faqs", cacheMiddleware, faqRoutes);
// Define routes for authentication
app.use("/api/auth", authRoutes);

// Export the Express application instance
export default app;
