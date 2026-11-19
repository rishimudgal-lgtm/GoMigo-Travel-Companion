const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    profile: {
      home: { type: String, default: '' },
      style: { type: String, default: 'Balanced' },
      photo: { type: String, default: '' }
    },
    savedDestinations: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
