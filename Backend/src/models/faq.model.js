// Import the mongoose module
import mongoose from "mongoose";

// Define the FAQ schema
const faqSchema = new mongoose.Schema(
  {
    // Define the question field with type String and required validation
    question: {
      type: String,
      required: true
    },
    // Define the answer field with type String and required validation
    answer: {
      type: String,
      required: true
    },
    // Define the translations field to store translations of the question and answer
    translations: {
      // Define a map to store translations of the question
      question_translation: {
        type: Map,
        of: String,
      },
      // Define a map to store translations of the answer
      answer_translation: {
        type: Map,
        of: String,
      },
    },
  },
  // Enable timestamps to automatically add createdAt and updatedAt fields
  { timestamps: true }
);

// Create the FAQ model using the schema
const FAQ = mongoose.model("FAQ", faqSchema);

// Export the FAQ model as the default export
export default FAQ;
