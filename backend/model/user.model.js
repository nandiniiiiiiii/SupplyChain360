const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,  
    trim: true,    // Trim leading/trailing spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,  
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], // Email validation
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Factory Manager', 'Logistics Manager', 'Analyst', 'Executives', 'Support', 'External Users'],  // Example roles, adjust based on your app's needs
  },

}, {
  timestamps: true,
});

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified or is new
  if (this.isModified('password') || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);  // Hash the password with bcrypt
      this.password = hashedPassword;  // Set the hashed password
      next();  // Proceed with saving the document
    } catch (error) {
      next(error);  // Pass any errors to the next middleware
    }
  } else {
    next();  // If the password wasn't modified, just proceed
  }
});

// Method to compare passwords (used during login)
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);  // Compare the plain password with the hashed one
};

module.exports = mongoose.model('user', userSchema);
