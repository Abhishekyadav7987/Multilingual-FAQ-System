// Import necessary modules and libraries for testing
import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import app from "../server.js";

// Define the MongoDB URI for testing
const TEST_MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/faq_api_test";

// Describe the test suite for the FAQ API
describe("FAQ API", () => {
  // Before all tests, connect to the test database
  beforeAll(async () => {
    await mongoose.connect(TEST_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // After all tests, close the database connection
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test case for creating a new FAQ
  it("should create a new FAQ", async () => {
    // Send a POST request to create a new FAQ
    const res = await request(app)
      .post("/api/faqs")
      .send({
        question: "What is Node.js?",
        answer: "Node.js is a runtime environment.",
      });

    // Check that the response status is 201 (Created)
    expect(res.status).toBe(201);
    // Check that the response body contains the correct question and answer
    expect(res.body.question).toBe("What is Node.js?");
    expect(res.body.answer).toBe("Node.js is a runtime environment.");
  });
});
