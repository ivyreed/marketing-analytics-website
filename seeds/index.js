const sequelize = require('../config/connection');
const { User, Video, Search } = require('../models');

const userData = require('./userData.json');
const videoData = require('./videoData.json');
const searchData = require('./searchData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const video of videoData) {
    await Video.create({
      ...video,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  };

  for (const search of searchData) {
    await Search.create({
      ...search,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }; 

  process.exit(0);
};

seedDatabase();
