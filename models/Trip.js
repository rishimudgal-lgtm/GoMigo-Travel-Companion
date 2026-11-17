const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destination: { type: String, required: true, trim: true },
  dates: { type: String, required: true },
  duration: { type: String, default: '3 Days' },
  travellers: { type: Number, default: 1, min: 1 },
  budgetInr: { type: Number, required: true, min: 100 },
  travelStyle: { type: String, default: 'Balanced' },
  interests: [{ type: String }],
  notes: { type: String, default: '' },
  isSaved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);