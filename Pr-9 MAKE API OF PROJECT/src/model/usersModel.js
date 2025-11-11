const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, 
    unique: true,  
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"], 
  },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Employee"],
    required: true,
  },
  profile: {
    type: String, 
  },
  contactNo: {
    type: Number, 
  },
  isDelete: {
    type: Boolean, 
    default: false,
  },
}, {
  timestamps: true, 
  versionKey: false, 
});


module.exports = mongoose.model('user', usersSchema);
