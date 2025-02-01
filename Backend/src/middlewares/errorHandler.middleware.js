// Define the error handling middleware function
const errorHandler = (err, req, res, next) => {
  // Log the error stack trace to the console for debugging
  console.error(err.stack);

  // Send a 500 Internal Server Error response with a JSON payload
  res
    .status(500)
    .json({ message: "Something went wrong", error: err.message });
};

// Export the errorHandler function as the default export
export default errorHandler;
