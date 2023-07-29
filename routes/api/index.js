const router = require('express').Router();
const {
  UserController,
  PageController,
  ProjectsController,
  SearchController,
} = require('../../controllers/');
const searchRouter = require('./searchRoutes');

const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);

// router.use('dashboard', PageController);
router.get('/dashboard', isAuthenticated, PageController.getProjects);

router.post('/projects', isAuthenticated, ProjectsController.newProject);
router.delete(
  '/projects/:projectId',
  isAuthenticated,
  ProjectsController.deleteProject
);

router.post('/search', SearchController.newSearch);
router.get('/search', SearchController.getSearch);

router.use(searchRouter);

module.exports = router;
