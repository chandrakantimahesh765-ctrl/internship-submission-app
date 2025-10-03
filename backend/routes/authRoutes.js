// In routes/authRoutes.js

const express = require('express');
const router = express.Router();

// We now import BOTH controller functions
const { registerUser, loginUser } = require('../controllers/authController.js');

// Route for registering
router.post('/register', registerUser);

// --- NEW ROUTE ---
// Route for logging in
router.post('/login', loginUser);

module.exports = router;