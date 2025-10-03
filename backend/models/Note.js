// In models/Note.js

const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    // This is a special field to link a Note to a User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This creates a relationship with our User model
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;