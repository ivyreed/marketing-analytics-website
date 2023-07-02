const router = require('express').Router();
const { UserController, PageController } = require('../../controllers/');

const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);

router.post('/dashboard', PageController.newProject);
router.get('/dashboard', PageController.getProjects);

module.exports = router;
