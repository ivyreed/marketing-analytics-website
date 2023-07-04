const router = require('express').Router();
const { Project, User, Search } = require('../../models');
const withAuth = require('../../middleware/isAuthenticated');

// GET all searches for a given project under a user
router.get('/:serch_id', async (req, res) => {
  try {
    const searchData = await Search.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const searches = searchData.map(search => search.get({ plain: true }));

    res.render('dashboard', {
      searches,
      logged_in: req.sesion.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST new search query after making search
router.post('/', withAuth, async (req, res) => {
  try {
    const searchData = await Search.create({
      ...req.body,
      use_id: req.session.user_id,
    });

    const searches = searchData.map(search => search.get({ plain: true }));

    res.render('dashboard', {
      searches,
      logged_in: req.sesion.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
