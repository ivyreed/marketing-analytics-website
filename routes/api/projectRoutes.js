const router = require('express').Router();
const { Project, User } = require('../../models');
const withAuth = require('../../middleware/isAuthenticated');

// get all Projects from User
router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [{ model: User, attributes: ['name'] }],
    });

    const projects = projectData.map(project => project.get({ plain: true }));

    res.render('dashboard', {
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// get a single Project after clicking on front end
router.get('/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name'] }],
    });

    const project = projectData.get({ plain: true });

    res.render('dashboard', {
      ...project,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
