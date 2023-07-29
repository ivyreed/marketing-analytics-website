const { Project } = require('../models');
const { User } = require('../models');

module.exports = {
  getDashboard: async (req, res) => {
    const user = await User.findOne({
      where: {
        id: req.session.currentUser.id,
      },
      include: [
        {
          model: Project,
          attributes: ['id', 'name'],
        },
      ],
    });
    const formattedUser = user.get({ plain: true });

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
};
