// models/User.js
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: 'username required buddy!',
    unique: true,
    minlength: 3,
    maxlength: 26,
  },
  email: {
    type: String,
    required: 'email required buddy!',
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: 'password required buddy!',
    required: true,
    minlength: 3,
    maxlength: 26,
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  try {
    // Check if the password is already hashed (i.e., not modified)
    if (!this.isModified('password')) {
      return next();
    }

    // Hash the password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = model('User', userSchema);

module.exports = User;
