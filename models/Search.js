const { Model, DataTypes } = require('sequelize');

const sequelize = require('../db/config');

class Search extends Model {}

Search.init(
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
