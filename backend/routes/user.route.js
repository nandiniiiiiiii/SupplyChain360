const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model.js');
require('dotenv').config();
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Middleware to check for validation errors
const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Password validation function
const validatePassword = (password) => {
  // Add custom validation rules (e.g., minimum length, etc.)
  return password.length >= 6; // Example rule
};

// Register route
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').custom((value) => {
      if (!validatePassword(value)) {
        throw new Error('Password must be at least 6 characters long');
      }
      return true;
    }),
    body('username').not().isEmpty().withMessage('Username is required'),
    body('role').not().isEmpty().withMessage('Role is required')
  ],
  validateInput,
  async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create and save the new user
      const user = new User({ username, email, password: hashedPassword, role });
      await user.save();

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Send the response with the token and user role
      res.status(201).json({
        message: 'User registered successfully',
        token,
        role: user.role 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error registering user', error: err.message });
    }
  }
);

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' }); // 401 for unauthorized
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Ensure JWT_SECRET is set
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not set in environment variables');
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Respond with the token
    return res.status(200).json({ token });
  } catch (err) {
    // Log the error for debugging purposes
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

let tokenBlacklist = new Set(); // In-memory store for simplicity

router.post('/logout', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header

    if (token) {
      tokenBlacklist.add(token); // Add token to blacklist
    }

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Error during logout:', err);
    return res.status(500).json({ message: 'Error during logout', error: err.message });
  }
});


module.exports = router;
