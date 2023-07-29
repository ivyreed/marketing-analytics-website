const { Project } = require('../models');

module.exports = {
  newProject: async (req, res) => {
    const {
      body: { name },
    } = req;
    try {
      const project = await Project.create({
        user_id: `${req.session.currentUser.id}`,
        name,
      });
      res.status(200).json(project);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  deleteProject: async (req, res) => {
    try {
      const projectData = await Project.destroy({
        where: {
          id: req.params.projectId,
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
  },
};
