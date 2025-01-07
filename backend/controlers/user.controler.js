const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model.js');
require('dotenv').config();

// Password validation function
const validatePassword = (password) => {
  // Add custom validation rules (e.g., minimum length, etc.)
  return password.length >= 6; // Example rule
};

//register resolver
const register = async (parent, { username, email, password, role }) => {
  console.log(username)
  // Input validation using similar logic to Express.js
  const errors = [];

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('Please enter a valid email');
  }

  if (!validatePassword(password)) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!username) {
    errors.push('Username is required');
  }

  if (!role) {
    errors.push('Role is required');
  }

  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  try {
    // Check if the email is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const user = new User({ username, email, password: hashedPassword, role });
    const savedUser = await user.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return response similar to your Express.js route
    return { message: 'User registered successfully', token, user: savedUser };

  } catch (err) {
    console.error(err);
    throw new Error('Error registering user: ' + err.message);
  }
}

// Login route
const login = async (parent, { email, password }) => {
  try {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password'); // Avoid exposing which field is incorrect
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // Ensure JWT_SECRET is set
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not set in environment variables');
      throw new Error('Internal server error');
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Return the token and user details
    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  } catch (err) {
    console.error('Error during login:', err);
    throw new Error('Authentication failed: ' + err.message);
  }
}

let tokenBlacklist = new Set(); // In-memory store for simplicity

const logout = async (parent, args, context) => {
  try {
    const authorizationHeader = context.headers.authorization;
    if (!authorizationHeader) {
      throw new Error('Authorization header missing');
    }
    
    const token = authorizationHeader?.split(' ')[1]; // Extract token from the Authorization header

    if (token) {
      tokenBlacklist.add(token); // Add the token to the blacklist
      return {
        success: true,
        message: 'Logged out successfully',
      };
    }

    throw new Error('Token not provided');
  } catch (err) {
    console.error('Error during logout:', err);
    return {
      success: false,
      message: 'Error during logout',
    };
  }
}


module.exports = { login, register, logout };
