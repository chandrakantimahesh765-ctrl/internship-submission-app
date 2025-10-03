// In controllers/noteController.js

const Note = require('../models/Note.js');

// @desc    Get all of a user's notes
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
  // Find notes that belong to the logged-in user
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Please add a title and content' });
  }

  const note = new Note({
    title,
    content,
    user: req.user._id, // Associate the note with the logged-in user
  });

  const createdNote = await note.save();
  res.status(201).json(createdNote);
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findById(req.params.id);

  // Check if note exists and if it belongs to the logged-in user
  if (note && note.user.toString() === req.user._id.toString()) {
    note.title = title || note.title;
    note.content = content || note.content;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404).json({ message: 'Note not found or user not authorized' });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  // Check if note exists and if it belongs to the logged-in user
  if (note && note.user.toString() === req.user._id.toString()) {
    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } else {
    res.status(404).json({ message: 'Note not found or user not authorized' });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };