// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../db/config');

// Initialize Product model (table) by extending off Sequelize's Model class
class Project extends Model {}

// set up fields and rules for Product model
Project.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 15],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Project',
  }
);

module.exports = Project;
