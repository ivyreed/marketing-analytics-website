const User = require('./User');
const PrevSearch = require('./PrevSearch');
// const Search = require('./Search');
const Video = require('./Video');

User.hasMany(Video, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})
Video.belongsTo(User, {
  foreignKey: "user_id"
})


module.exports = {
  User,
  PrevSearch,
  // Search,
  Video
};
