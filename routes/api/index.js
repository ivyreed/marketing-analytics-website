const router = require('express').Router();
const {
  UserController,
  PageController,
  SearchController,
} = require('../../controllers');
const searchRouter = require('./searchRoutes');

const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);

router.post('/dashboard', PageController.newProject);
router.get('/dashboard', PageController.getProjects);
router.delete('/dashboard', PageController.deleteProject);

router.post('/search', SearchController.newSearch);
router.get('/search', SearchController.getSearch);

// router.use(searchRouter);

module.exports = router;
