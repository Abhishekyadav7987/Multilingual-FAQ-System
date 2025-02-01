// Import the Express module
import express from "express";
// Import the signIn and signUp controller functions
import { signIn, signUp } from "../controllers/auth.controller.js";

// Create a new router instance
const router = express.Router();

// Sign-in route
router.post("/signin", signIn);

// Sign-up route
router.post("/signup", signUp);

// Export the router instance as the default export
export default router;
