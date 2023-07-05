const { User } = require('../models');

// CREATE new user
module.exports = {
  register: async (req, res) => {
    const {
      body: { firstName, lastName, email, password },
    } = req;
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });

      delete user.password;

      req.session.save(() => {
        req.session.isAuthenticated = true;
        req.session.currentUser = user;
        req.session.user_id = user.user_id;
        res.status(200).json(user);
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
      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ['createdAt, updatedAt'] },
      });
      console.log(user);
      if (!user) {
        res.status(400).json({
          message: 'Incorrect email or password. Please try again!',
        });
        return;
      }

      const validPassword = await user.checkPassword(password);

      if (!validPassword) {
        res.status(400).json({
          message: 'Incorrect email or password. Please try again!',
        });
        return;
      }

      delete user.password;

      req.session.save(() => {
        req.session.isAuthenticated = true;
        req.session.currentUser = user;
        req.session.user_id = user.user_id;

        res.status(200).json({
          user,
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
