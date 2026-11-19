const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/mainController');
const auth = require('../controllers/authController');
const { requireAuth } = require('../middleware/session');

router.get('/', ctrl.getLanding);
router.get('/destinations', ctrl.getDestinations);
router.get('/explore', requireAuth, ctrl.getExplore);
router.get('/trip-planner', requireAuth, ctrl.getPlanner);
router.get('/my-trips', requireAuth, ctrl.getMyTrips);
router.get('/saved', requireAuth, ctrl.getSaved);
router.get('/itinerary/:id', requireAuth, ctrl.getItineraryDetail);
router.get('/travel-guide', requireAuth, ctrl.getTravelGuide);
router.get('/travel-guide-preview', ctrl.getTravelGuidePreview);
router.get('/main-menu', requireAuth, ctrl.getMainMenu);
router.get('/profile', requireAuth, ctrl.getProfile);
router.get('/login', ctrl.getLogin);
router.get('/signup', ctrl.getSignup);
router.get('/logout', auth.logoutPage);

router.get('/api/auth/session', auth.getSession);
router.post('/api/auth/login', auth.login);
router.post('/api/auth/signup', auth.signup);
router.post('/api/auth/logout', auth.logout);
router.get('/api/account', requireAuth, auth.getAccount);
router.patch('/api/account/profile', requireAuth, auth.updateProfile);
router.put('/api/account/trips', requireAuth, auth.updateTrips);
router.put('/api/account/saved', requireAuth, auth.updateSaved);

// CRUD Actions
router.post('/trips', requireAuth, ctrl.createTrip);
router.post('/trips/:id/update', requireAuth, ctrl.updateTrip);
router.post('/trips/:id/save', requireAuth, ctrl.toggleSaveTrip);
router.post('/trips/:id/delete', requireAuth, ctrl.deleteTrip);
router.post('/login', auth.postLogin);
router.post('/signup', auth.postSignup);
module.exports = router;
