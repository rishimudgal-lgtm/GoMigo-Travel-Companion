require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const Destination = require('./models/Destination');

async function importDestinations() {
  const html = fs.readFileSync('./views/destinations.hbs', 'utf8');
  const regex = /<article class="destination-card" data-tags="([^"]+)"[^>]*>[\s\S]*?<img src="([^"]+)"[\s\S]*?<span class="explore-place-name">([^<]+)<small>([^<]+)<\/small>/g;
  const cards = [...html.matchAll(regex)];

  const items = cards.map((m, i) => ({
    name: m[3].trim(),
    state: m[4].trim(),
    category: m[1].split(' ')[0],
    bestSeason: 'Oct - Mar',
    dailyBudgetInr: 3000 + (i % 5) * 500,
    description: `Explore ${m[3].trim()}, ${m[4].trim()}`,
    imageUrl: '/' + m[2].replace(/^\//, '')
  }));

  await mongoose.connect(process.env.MONGO_URI);
  await Destination.deleteMany({});
  await Destination.insertMany(items);
  console.log(`Successfully imported ${items.length} destinations into MongoDB!`);
  process.exit(0);
}

importDestinations().catch(err => {
  console.error(err);
  process.exit(1);
});