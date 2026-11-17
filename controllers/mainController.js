const Trip = require('../models/Trip');
const Destination = require('../models/Destination');

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
    const destinations = await Destination.find().lean();
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
exports.getTravelGuide = (req, res) => res.render('/travel-guide');
exports.getTravelGuidePreview = (req, res) => res.render('travel-guide-preview');
exports.getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 }).lean();
    res.render('my-trips', { trips });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getSaved = async (req, res) => {
  try {
    const trips = await Trip.find({ isSaved: true }).sort({ createdAt: -1 }).lean();
    res.render('saved', { trips });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// READ Single + Innovation Feature (Per-Day & Per-Person ₹ Breakdown)
exports.getItineraryDetail = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).lean();
    if (!trip) return res.status(404).send('Trip not found');
    const days = parseInt(trip.duration) || 3;
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
    await Trip.create({
      destination,
      dates,
      duration,
      travellers: parseInt(travellers, 10) || 1,
      budgetInr: Number(budgetInr) || 5000,
      travelStyle,
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
    await Trip.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect(`/itinerary/${req.params.id}`);
  } catch (err) {
    res.status(400).send('Error updating trip: ' + err.message);
  }
};

// SAVE / BOOKMARK Trip
exports.toggleSaveTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
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
    await Trip.findByIdAndDelete(req.params.id);
    res.redirect('/my-trips');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const User = require('../models/User');

exports.postSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (email && password) {
      await User.findOneAndUpdate(
        { email },
        { name: name || 'Explorer', email, password },
        { upsert: true, new: true }
      );
    }
    res.redirect('/main-menu');
  } catch (err) {
    res.redirect('/main-menu');
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      await User.findOneAndUpdate(
        { email },
        { name: email.split('@')[0], email, password },
        { upsert: true, new: true }
      );
    }
    res.redirect('/main-menu');
  } catch (err) {
    console.error('Login DB error:', err);
    res.redirect('/main-menu');
  }
};