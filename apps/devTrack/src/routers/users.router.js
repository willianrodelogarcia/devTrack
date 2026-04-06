const { Router } = require('express');
const { requiredAuth } = require('../utils/middleware/auth');
const userController = require('../controllers/user.controller');

const router = Router();

router.post('/', userController.createUser);

router.get('/', userController.getUser);

router.post('/sync', requiredAuth, userController.syncUser);

router.get('/me', requiredAuth, userController.getUserById);

module.exports = router;
