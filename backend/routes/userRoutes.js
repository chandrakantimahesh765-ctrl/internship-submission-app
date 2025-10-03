// In routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js'); // <-- Import our 'security guard'

// Any request to GET /profile will first go through our 'protect' middleware.
// If the token is valid, it will proceed to the getUserProfile function.
// If not, the middleware will send an error and stop it.
router.get('/profile', protect, getUserProfile);

module.exports = router;