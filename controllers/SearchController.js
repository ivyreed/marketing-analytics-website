const { Search } = require('../models');
module.exports = {
  getSearch: async (req, res) => {
    try {
      const search = await Search.findAll({
        attributes: ['query'],
        where: {
          user_id: '2391af41-98d6-43a5-a9a7-79577e142445',
        },
      });

      res.status(200).json(search);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  newSearch: async (req, res) => {
    const {
      body: { user_id, query },
    } = req;
    try {
      const search = await Search.create({
        user_id,
        query,
      });

      res.status(200).json(search);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
