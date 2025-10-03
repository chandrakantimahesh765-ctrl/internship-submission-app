// In controllers/userController.js

const User = require('../models/User.js');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (because we will use our middleware)
const getUserProfile = async (req, res) => {
  // The 'protect' middleware that we will use on this route
  // has already fetched the user from the database and attached it to the request as 'req.user'.
  // So, we can just send it back as a response.
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  getUserProfile,
};