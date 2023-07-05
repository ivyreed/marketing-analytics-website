const { Model, DataTypes } = require('sequelize');

const sequelize = require('../db/config');

class Search extends Model {}

Search.init(
  // define columns
  {
    search_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'user_id',
        unique: false,
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Project',
        key: 'project_id',
        unique: false,
      },
    },
    query: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Search',
  }
);

module.exports = Search;
