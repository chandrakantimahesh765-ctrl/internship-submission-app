const mongoose = require('mongoose');

// This is the blueprint for our user data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // A name is required
    trim: true      // Removes any extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,   // Every email must be unique in the database
    lowercase: true // Converts email to lowercase
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

// Export the model so we can use it in other files
module.exports = User;