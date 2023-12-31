const sequelize = require('../db/config');
const { User, Project, Search } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const searchData = require('./searchData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const search of searchData) {
    await Search.create({
      ...search,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
