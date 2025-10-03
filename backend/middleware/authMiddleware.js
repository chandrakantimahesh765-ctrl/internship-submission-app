// In middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const protect = async (req, res, next) => {
  let token;

  // Check if the request headers contain a token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Get token from the header (it looks like "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token is valid using our JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user in the database using the ID from the token
      //    and attach the user object to the request (but not the password)
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Call the next function in the chain (either another middleware or the final controller)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };