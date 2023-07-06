const { Project } = require('../models');
const { Search } = require('../models');
const { User } = require('../models');

module.exports = {
  getDashboard: async (req, res) => {
    // console.log(req.session);
    const user = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      include: [
        {
          model: Project,
          attributes: ['id', 'name'],
        },
      ],
    });
    const formattedUser = user.get({ plain: true });
    console.log('rendering the dashboard');
    res.render('dashboard', {
      user: formattedUser,
      welcomeMessage: `Welcome to the dashboard ${req.session.currentUser.firstName}!`,
      isAuthenticated: req.session.isAuthenticated,
    });
  },

  getProjects: async (req, res) => {
    const {
      body: { user_id },
    } = req;
    try {
      const project = await Project.findAll({
        where: { user_id },
        include: [
          {
            model: Project,
            attributes: ['name'],
          },
        ],
      });

      res.status(200).json(project);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  newProject: async (req, res) => {
    const {
      body: { user_id, name },
    } = req;
    console.log(name);
    console.log(req.session.user_id);
    try {
      const project = await Project.create({
        user_id: `${req.session.user_id}`,
        name,
      });
      console.log(project);
      res.status(200).json(project);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  getSearch: async (req, res) => {
    const {
      body: { search_id, query },
    } = req;
    try {
      const search = await Search.findAll({
        where: { search_id, query },
      });

      res.status(200).json(search);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  newSearch: async (req, res) => {
    const {
      body: { search_id, query },
    } = req;
    try {
      const search = await Search.create({
        where: { search_id, query },
      });

      res.status(200).json(search);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
