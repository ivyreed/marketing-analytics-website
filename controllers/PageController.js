const { Project } = require('../models');
const { Search } = require('../models');

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
