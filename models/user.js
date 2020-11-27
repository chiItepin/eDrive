const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for User
const UserSchema = new Schema({
  _id: { type: String,
    default: uuidv4
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'A valid password is required'],
  },
}, { timestamps: true })

//create model for User
const User = mongoose.model('user', UserSchema);

module.exports = User;