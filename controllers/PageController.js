const { Project } = require('../models');

module.exports = {
  getDashboard: (req, res) => {
    res.render('dashboard', {
      welcomeMessage: `Welcome to the dashboard ${req.session.currentUser.firstName}!`,
      isAuthenticated: req.session.isAuthenticated,
    });
  },

  getProjects: async (req, res) => {
    const {
      body: { user_id, name },
    } = req;
    try {
      const project = await Project.findAll({
        where: { user_id, name },
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
    try {
      const project = await Project.create({
        where: { user_id, name },
      });

      res.status(200).json(project);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
