const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltround = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Only hash password if it's new or changed
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hashed = await bcrypt.hash(this.password, saltround);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;
