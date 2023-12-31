const User = require('./User');
const Search = require('./Search');
const PrevSearch = require('./PrevSearch');
const Project = require('./Project');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Project.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Search, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Search.belongsTo(User, {
  foreignKey: 'user_id',
});

Project.hasMany(Search, {
  foreignKey: 'project_id',
  onDelete: 'CASCADE',
});

Search.belongsTo(Project, {
  foreignKey: 'project_id',
});

module.exports = {
  User,
  Search,
  PrevSearch,
  Project,
};
