const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/mainController');

router.get('/', ctrl.getLanding);
router.get('/destinations', ctrl.getDestinations);
router.get('/explore', ctrl.getExplore);
router.get('/trip-planner', ctrl.getPlanner);
router.get('/my-trips', ctrl.getMyTrips);
router.get('/saved', ctrl.getSaved);
router.get('/itinerary/:id', ctrl.getItineraryDetail);
router.get('//travel-guide', ctrl.getTravelGuide);
router.get('/travel-guide-preview', ctrl.getTravelGuidePreview);
router.get('/main-menu', ctrl.getMainMenu);
router.get('/profile', ctrl.getProfile);
router.get('/login', ctrl.getLogin);
router.get('/signup', ctrl.getSignup);

// CRUD Actions
router.post('/trips', ctrl.createTrip);
router.post('/trips/:id/update', ctrl.updateTrip);
router.post('/trips/:id/save', ctrl.toggleSaveTrip);
router.post('/trips/:id/delete', ctrl.deleteTrip);
router.post('/login', ctrl.postLogin);
router.post('/signup', ctrl.postSignup);
module.exports = router;