const { Search, User } = require('../models');
module.exports = {
  getSearch: async (req, res) => {
    console.log(`${req.session.user_id}`);
    try {
      const search = await Search.findAll({
        attributes: ['query'],
        where: {
          user_id: `${req.session.user_id}`,
        },
        include: [
          {
            model: User,
            require: false,
          },
        ],
      });
      req.session.query = search.query;
      res.status(200).json(search);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  newSearch: async (req, res) => {
    console.log(`${req.session.user_id}`);
    const {
      body: { query },
    } = req;
    try {
      console.log(query);
      const search = await Search.create({
        user_id: `${req.session.user_id}`,
        query,
      });

      res.status(200).json(search);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
