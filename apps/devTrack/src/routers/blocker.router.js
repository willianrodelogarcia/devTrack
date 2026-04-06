const { Router } = require('express');
const { requiredAuth } = require('../utils/middleware/auth');
const blockerController = require('../controllers/blocker.controller');

const router = Router();

router.post('/', requiredAuth, blockerController.createBlocker);
router.patch('/:blockerId', requiredAuth, blockerController.updateBlocker);

module.exports = router;
