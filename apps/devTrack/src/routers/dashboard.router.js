const { Router } = require('express');
const { requiredAuth } = require('../utils/middleware/auth');
const dashboardController = require('../controllers/dashboard.controller');

const router = Router();

router.get('/stats', requiredAuth, dashboardController.getStats);
router.get('/activity', requiredAuth, dashboardController.getActivity);
router.get('/timeline', requiredAuth, dashboardController.getTimeline);
router.get('/blockers', requiredAuth, dashboardController.getBlockers);

module.exports = router;
