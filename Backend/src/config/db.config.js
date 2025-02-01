// Import mongoose for MongoDB interactions
import mongoose from "mongoose";

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    // Log any connection errors and exit the process with failure
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Export the connectDB function as the default export
export default connectDB;
