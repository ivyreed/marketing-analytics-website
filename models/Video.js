// create_date
// username
// video_id
// video_length
// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../db/config');

// Initialize Product model (table) by extending off Sequelize's Model class
class Video extends Model {}

// set up fields and rules for Product model
Video.init(
  // define columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
        unique: false,
      },
    },
    length: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      isDecimal: true,
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      isNumeric: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'video',
  }
);

module.exports = Video;
