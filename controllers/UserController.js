const { User } = require('../models');

// CREATE new user
module.exports = {
  register: async (req, res) => {
    const {
      body: { firstName, lastName, email, password },
    } = req;
    try {
      const dbUser = await User.create({
        firstName,
        lastName,
        email,
        password,
      });

      const user = dbUser.get({ plain: true });
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      const sessionUser = { ...user };

      req.session.save(() => {
        req.session.isAuthenticated = true;
        req.session.currentUser = sessionUser;
        req.session.user_id = user.id;
        res.status(200).json(dbUser);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
      console.log(
        'please use a real email and make sure you use a strong password'
      );
    }
  },

  login: async (req, res) => {
    const {
      body: { email, password },
    } = req;
    try {
      const dbUser = await User.findOne({
        where: { email },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      if (!dbUser) {
        res.status(400).json({
          message: 'Incorrect email or password. Please try again!',
        });
        return;
      }

      const validPassword = await dbUser.checkPassword(password);

      if (!validPassword) {
        res.status(400).json({
          message: 'Incorrect email or password. Please try again!',
        });
        return;
      }
      const user = dbUser.get({ plain: true });
      delete user.password;
      const sessionUser = { ...user };

      req.session.save(() => {
        req.session.isAuthenticated = true;
        req.session.currentUser = sessionUser;
        req.session.user_id = user.id;

        res.status(200).json({
          user: dbUser,
          message: 'You are now logged in!',
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  logout: (req, res) => {
    if (req.session.isAuthenticated) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },
};
