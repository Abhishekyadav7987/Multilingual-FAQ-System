// Import mongoose for MongoDB interactions
import mongoose from "mongoose";
// Import bcrypt for hashing passwords
import bcrypt from "bcryptjs";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    // Define the email field with type String, required validation, and unique constraint
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    // Define the password field with type String and required validation
    password: { 
        type: String, 
        required: true 
    },
    // Define the role field with type String, enum validation, and default value
    role: { 
        type: String, 
        enum: ["admin", "user"], 
        default: "user" 
    },
  },
  // Enable timestamps to automatically add createdAt and updatedAt fields
  { timestamps: true }
);

// Hash password before saving the user document
userSchema.pre("save", async function (next) {
  // If the password is not modified, move to the next middleware
  if (!this.isModified("password")) return next();
  // Hash the password with a salt factor of 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare the provided password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

// Export the User model as the default export
export default User;
