const mongoose = require('mongoose');
const  {hashPassword} = require('../utils/security')

const userModel = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userModel.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
});

module.exports = mongoose.model('User', userModel);