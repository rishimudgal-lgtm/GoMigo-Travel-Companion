const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  category: { type: String, default: 'Heritage' },
  bestSeason: { type: String, default: 'October - March' },
  dailyBudgetInr: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: '/landing_assets/jaipur.png' }
});

module.exports = mongoose.model('Destination', destinationSchema);