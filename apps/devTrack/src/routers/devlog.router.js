const { Router } = require('express');
const { requiredAuth } = require('../utils/middleware/auth');
const devlogController = require('../controllers/devlog.controller');

const router = Router();

router.post('/', requiredAuth, devlogController.createDevlog);

router.get('/', devlogController.getAllDevlogs);

router.get('/project', requiredAuth, devlogController.getDevlogsByProjectId);

router.get(
  '/project/:projectId/today',
  requiredAuth,
  devlogController.getDevlogTodayByProjectId,
);

router.patch('/:devlogId', requiredAuth, devlogController.updateDevlog);

module.exports = router;
