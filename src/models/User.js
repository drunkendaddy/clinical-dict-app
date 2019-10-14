const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'VIEWER', 'CONTRIBUTOR'],
    required: true,
    default: 'VIEWER'
  }
});

module.exports = mongoose.model('User', UserSchema);