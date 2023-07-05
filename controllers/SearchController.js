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
  //   user_id: '2391af41-98d6-43a5-a9a7-79577e142445',

  newSearch: async (req, res) => {
    console.log(`${req.session.user_id}`);
    const {
      body: { user_id, query },
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
