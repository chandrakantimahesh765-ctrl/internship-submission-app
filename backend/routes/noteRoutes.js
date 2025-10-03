// In routes/noteRoutes.js

const express = require('express');
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController.js');
const { protect } = require('../middleware/authMiddleware.js');

// These routes handle getting all notes and creating a new one
router.route('/').get(protect, getNotes).post(protect, createNote);

// These routes handle updating and deleting a single note by its ID
router.route('/:id').put(protect, updateNote).delete(protect, deleteNote);

module.exports = router;