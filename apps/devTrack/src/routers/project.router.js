const { Router } = require('express');
const { requiredAuth } = require('../utils/middleware/auth');
const projectController = require('../controllers/project.controller');

const router = Router();

router.post('/', requiredAuth, projectController.createProject);

router.get('/', projectController.getAllProjects);

router.get('/user', requiredAuth, projectController.getProjectByUserId);

router.get('/:projectId', requiredAuth, projectController.getProjectById);

module.exports = router;
