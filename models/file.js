const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema for File
const FileSchema = new Schema({
  _id: { type: String,
    default: uuidv4
  },
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  directory_id: {
    type: String,
    default: null,
  },
  path: {
    type: String,
    required: true,
  },
}, { timestamps: true })

//create model for File
const File = mongoose.model('file', FileSchema);

module.exports = File;