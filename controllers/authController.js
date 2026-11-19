const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../models/User');
const Trip = require('../models/Trip');

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  if (typeof stored !== 'string') return false;
  const [scheme, salt, encodedHash] = stored.split(':');
  if (scheme !== 'scrypt' || !salt || !encodedHash) return stored === password;
  const actual = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(encodedHash, 'hex');
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

function cleanTrip(raw, owner, inputBudgetMode = 'total') {
  if (!raw || typeof raw !== 'object') return null;
  const destination = String(raw.destination || '').trim().slice(0, 100);
  if (!destination) return null;
  const travellers = Number.parseInt(raw.travelers ?? raw.travellers, 10);
  const days = Math.min(60, Math.max(1, Number.parseInt(raw.duration, 10) || 3));
  const budget = Number(raw.budget ?? raw.budgetInr);
  return {
    owner,
    destination,
    dates: String(raw.dates || 'Flexible dates').trim().slice(0, 100),
    duration: String(days),
    travellers: Number.isFinite(travellers) && travellers > 0 ? travellers : 1,
    budgetInr: Number.isFinite(budget) && budget >= 100 ? Math.round(inputBudgetMode === 'daily' ? budget * days : budget) : 5000,
    budgetMode: 'total',
    travelStyle: String(raw.style || raw.travelStyle || 'Balanced').trim().slice(0, 60),
    interests: Array.isArray(raw.interests) ? raw.interests.map((item) => String(item).slice(0, 60)).slice(0, 20) : [],
    notes: String(raw.requests || raw.notes || '').trim().slice(0, 1000),
    isSaved: Boolean(raw.isSaved)
  };
}

function accountTrip(trip) {
  const id = String(trip._id);
  const days = Math.max(1, Number.parseInt(trip.duration, 10) || 1);
  const totalBudgetInr = trip.budgetMode === 'total' ? trip.budgetInr : trip.budgetInr * days;
  return {
    id,
    destination: trip.destination,
    dates: trip.dates,
    duration: trip.duration,
    travelers: String(trip.travellers || 1),
    budget: totalBudgetInr,
    style: trip.travelStyle,
    interests: trip.interests || [],
    requests: trip.notes || '',
    isSaved: Boolean(trip.isSaved),
    createdAt: trip.createdAt ? new Date(trip.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
  };
}

function accountProfile(user) {
  const profile = user.profile || {};
  return {
    name: user.name,
    email: user.email,
    home: profile.home || '',
    style: profile.style || 'Balanced',
    photo: profile.photo || ''
  };
}

function setSessionResponse(user, req, res) {
  req.createAuthSession(user._id);
  if (!req.path.startsWith('/api/')) return res.redirect('/main-menu');
  res.json({ authenticated: true, user: { name: user.name, email: user.email } });
}

function sendAuthError(req, res, status, message) {
  if (req.path.startsWith('/api/')) return res.status(status).json({ error: message });
  const formPath = req.body.name ? '/signup' : '/login';
  return res.redirect(`${formPath}?error=${encodeURIComponent(message)}`);
}

exports.getSession = async (req, res) => {
  if (!req.authUserId) return res.json({ authenticated: false });
  try {
    const user = await User.findById(req.authUserId).select('name email').lean();
    if (!user) {
      req.clearAuthSession();
      return res.json({ authenticated: false });
    }
    res.json({ authenticated: true, user: { name: user.name, email: user.email } });
  } catch {
    res.status(500).json({ error: 'Your sign-in could not be checked. Please try again.' });
  }
};

exports.login = async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (!email || !password) return sendAuthError(req, res, 400, 'Enter your email and password.');
  try {
    const user = await User.findOne({ email });
    if (!user || !verifyPassword(password, user.password)) {
      return sendAuthError(req, res, 401, 'That email and password did not match an account.');
    }
    if (!user.password.startsWith('scrypt:')) {
      user.password = hashPassword(password);
      await user.save();
    }
    return setSessionResponse(user, req, res);
  } catch (err) {
    console.error('Login error:', err.message);
    return sendAuthError(req, res, 500, 'Sign in could not be completed. Please try again.');
  }
};

exports.signup = async (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 80);
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8 || password.length > 128) {
    return sendAuthError(req, res, 400, 'Enter your name, a valid email, and a password of at least 8 characters.');
  }
  try {
    if (await User.exists({ email })) return sendAuthError(req, res, 409, 'An account already uses that email. Sign in instead.');
    const legacy = req.body.legacy || {};
    const legacyProfile = legacy.profile && typeof legacy.profile === 'object' ? legacy.profile : {};
    const user = await User.create({
      name,
      email,
      password: hashPassword(password),
      profile: {
        home: String(legacyProfile.home || '').slice(0, 100),
        style: String(legacyProfile.style || 'Balanced').slice(0, 60),
        photo: String(legacyProfile.photo || legacyProfile.photoData || '').slice(0, 900000)
      },
      savedDestinations: Array.isArray(legacy.saved) ? Array.from(new Set(legacy.saved.map(String))).slice(0, 200) : []
    });
    if (Array.isArray(legacy.trips) && legacy.trips.length) {
      const trips = legacy.trips.slice(0, 100).map((trip) => cleanTrip(trip, user._id, 'daily')).filter(Boolean);
      if (trips.length) await Trip.insertMany(trips);
    }
    return setSessionResponse(user, req, res);
  } catch (err) {
    if (err.code === 11000) return sendAuthError(req, res, 409, 'An account already uses that email. Sign in instead.');
    console.error('Signup error:', err.message);
    return sendAuthError(req, res, 500, 'Your account could not be created. Please try again.');
  }
};

exports.logout = (req, res) => {
  req.clearAuthSession();
  res.json({ authenticated: false });
};

exports.logoutPage = (req, res) => {
  req.clearAuthSession();
  res.redirect('/');
};

exports.getAccount = async (req, res) => {
  try {
    const [user, trips] = await Promise.all([
      User.findById(req.authUserId).lean(),
      Trip.find({ owner: req.authUserId }).sort({ createdAt: -1 }).lean()
    ]);
    if (!user) return res.status(401).json({ error: 'Please sign in again.' });
    res.json({ profile: accountProfile(user), trips: trips.map(accountTrip), saved: user.savedDestinations || [] });
  } catch (err) {
    console.error('Account read error:', err.message);
    res.status(500).json({ error: 'Your account details could not be loaded.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const name = String(req.body.name || '').trim().slice(0, 80);
    if (!name) return res.status(400).json({ error: 'Please enter a name for your profile.' });
    const user = await User.findById(req.authUserId);
    if (!user) return res.status(401).json({ error: 'Please sign in again.' });
    user.name = name;
    user.profile = {
      home: String(req.body.home || '').trim().slice(0, 100),
      style: String(req.body.style || 'Balanced').slice(0, 60),
      photo: String(req.body.photo || '').slice(0, 900000)
    };
    await user.save();
    res.json({ profile: accountProfile(user), user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('Profile save error:', err.message);
    res.status(400).json({ error: 'Your preferences could not be saved. Please try again.' });
  }
};

exports.updateTrips = async (req, res) => {
  try {
    const input = Array.isArray(req.body.trips) ? req.body.trips : null;
    if (!input || input.length > 100) return res.status(400).json({ error: 'The trip list could not be saved.' });
    const currentTrips = await Trip.find({ owner: req.authUserId }).select('_id').lean();
    const currentIds = new Set(currentTrips.map((trip) => String(trip._id)));
    const operations = [];
    const nextIds = [];
    input.forEach((raw) => {
      const trip = cleanTrip(raw, req.authUserId);
      if (!trip) return;
      const requestedId = String(raw.id || raw._id || '');
      const id = mongoose.Types.ObjectId.isValid(requestedId) && currentIds.has(requestedId)
        ? new mongoose.Types.ObjectId(requestedId)
        : new mongoose.Types.ObjectId();
      nextIds.push(id);
      operations.push({ updateOne: { filter: { _id: id, owner: req.authUserId }, update: { $set: trip }, upsert: true } });
    });
    if (operations.length) await Trip.bulkWrite(operations);
    await Trip.deleteMany({ owner: req.authUserId, _id: { $nin: nextIds } });
    const savedTrips = await Trip.find({ owner: req.authUserId }).sort({ createdAt: -1 }).lean();
    res.json({ trips: savedTrips.map(accountTrip) });
  } catch (err) {
    console.error('Trip save error:', err.message);
    res.status(400).json({ error: 'Your trip plans could not be saved. Please try again.' });
  }
};

exports.updateSaved = async (req, res) => {
  try {
    if (!Array.isArray(req.body.saved) || req.body.saved.length > 200) {
      return res.status(400).json({ error: 'Your saved places could not be updated.' });
    }
    const savedDestinations = Array.from(new Set(req.body.saved.map((name) => String(name).trim()).filter(Boolean))).slice(0, 200);
    await User.findByIdAndUpdate(req.authUserId, { $set: { savedDestinations } }, { runValidators: true });
    res.json({ saved: savedDestinations });
  } catch (err) {
    console.error('Saved places error:', err.message);
    res.status(400).json({ error: 'Your saved places could not be updated.' });
  }
};

exports.postLogin = async (req, res) => {
  req.url = '/login';
  return exports.login(req, res);
};

exports.postSignup = async (req, res) => {
  req.url = '/signup';
  return exports.signup(req, res);
};
