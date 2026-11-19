const Trip = require('../models/Trip');
const Destination = require('../models/Destination');
const fs = require('fs');
const path = require('path');

const destinationAssetDirectory = path.join(__dirname, '..', 'public', 'explore_assets', 'destinations');
const mainMenuAssetDirectory = path.join(__dirname, '..', 'public', 'main-menu-assets');

function tripImage(destination) {
  const city = String(destination || '').split(/[,(]/, 1)[0].trim();
  const slug = city.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const cityPhoto = path.join(destinationAssetDirectory, `${slug}.jpg`);
  if (slug && fs.existsSync(cityPhoto)) return `/explore_assets/destinations/${slug}.jpg`;
  const featuredPhoto = path.join(mainMenuAssetDirectory, `${slug}.png`);
  if (slug && fs.existsSync(featuredPhoto)) return `/main-menu-assets/${slug}.png`;
  return '/explore_assets/explore-hero.png';
}

function addTripImages(trips) {
  return trips.map((trip) => {
    const days = Math.max(1, parseInt(trip.duration, 10) || 1);
    const displayBudgetInr = trip.budgetMode === 'total' ? trip.budgetInr : trip.budgetInr * days;
    return { ...trip, displayBudgetInr, imageUrl: tripImage(trip.destination) };
  });
}

// Page Renders (READ)
exports.getLanding = async (req, res) => {
  try {
    const destinations = await Destination.find().limit(4).lean();
    res.render('landing_page', { destinations });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getDestinations = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const destinations = await Destination.find(filter).lean();
    res.render('destinations', { destinations });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getExplore = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ name: 1 }).lean();
    res.render('explore-app', { destinations });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getPlanner = (req, res) => res.render('trip-planner');
exports.getLogin = (req, res) => res.render('login');
exports.getSignup = (req, res) => res.render('signup');
exports.getProfile = (req, res) => res.render('profile');
exports.getMainMenu = (req, res) => res.render('main-menu');
exports.getTravelGuide = (req, res) => res.render('travel-guide');
exports.getTravelGuidePreview = (req, res) => res.render('travel-guide-preview');
exports.getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ owner: req.authUserId }).sort({ createdAt: -1 }).lean();
    res.render('my-trips', { trips: addTripImages(trips) });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getSaved = async (req, res) => {
  try {
    const savedTrips = await Trip.find({ owner: req.authUserId, isSaved: true }).sort({ createdAt: -1 }).lean();
    res.render('saved', { savedTrips: addTripImages(savedTrips) });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// READ Single + Innovation Feature (Per-Day & Per-Person ₹ Breakdown)
exports.getItineraryDetail = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, owner: req.authUserId }).lean();
    if (!trip) return res.status(404).send('Trip not found');
    trip.imageUrl = tripImage(trip.destination);
    const days = parseInt(trip.duration) || 3;
    if (trip.budgetMode !== 'total') trip.budgetInr *= days;
    trip.budgetMode = 'total';
    const perDayInr = Math.round(trip.budgetInr / days);
    const perPersonInr = Math.round(trip.budgetInr / (trip.travellers || 1));
    res.render('itinerary', { trip, perDayInr, perPersonInr });
  } catch (err) {
    res.status(500).send('Invalid Trip ID');
  }
};

// CREATE Trip
exports.createTrip = async (req, res) => {
  try {
    const { destination, dates, duration, travellers, budgetInr, travelStyle, notes } = req.body;
    const tripDays = Math.min(60, Math.max(1, parseInt(duration, 10) || 3));
    const dailyBudgetInr = Math.max(100, Number(budgetInr) || 5000);
    await Trip.create({
      owner: req.authUserId,
      destination,
      dates: dates || 'Flexible dates',
      duration: String(tripDays),
      travellers: parseInt(travellers, 10) || 1,
      budgetInr: dailyBudgetInr * tripDays,
      budgetMode: 'total',
      travelStyle: travelStyle || 'Balanced',
      interests: Array.isArray(req.body.interests) ? req.body.interests : (req.body.interests ? [req.body.interests] : []),
      notes
    });
    res.redirect('/my-trips');
  } catch (err) {
    res.status(400).send('Error saving trip: ' + err.message);
  }
};

// UPDATE Trip
exports.updateTrip = async (req, res) => {
  try {
    const updates = {
      budgetInr: Math.max(100, Number(req.body.budgetInr) || 100),
      budgetMode: 'total',
      travelStyle: String(req.body.travelStyle || 'Balanced').trim().slice(0, 60),
      notes: String(req.body.notes || '').trim().slice(0, 1000)
    };
    const updated = await Trip.findOneAndUpdate({ _id: req.params.id, owner: req.authUserId }, updates, { runValidators: true });
    if (!updated) return res.status(404).send('Trip not found');
    res.redirect(`/itinerary/${req.params.id}`);
  } catch (err) {
    res.status(400).send('Error updating trip: ' + err.message);
  }
};

// SAVE / BOOKMARK Trip
exports.toggleSaveTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, owner: req.authUserId });
    if (trip) {
      trip.isSaved = !trip.isSaved;
      await trip.save();
    }
    res.redirect('/my-trips');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// DELETE Trip
exports.deleteTrip = async (req, res) => {
  try {
    await Trip.findOneAndDelete({ _id: req.params.id, owner: req.authUserId });
    res.redirect('/my-trips');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
