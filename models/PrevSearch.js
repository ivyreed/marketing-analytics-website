const { Model, DataTypes } = require('sequelize');

const sequelize = require('../db/config');

class PrevSearch extends Model {}

PrevSearch.init(
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
    search_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Search',
        key: 'id',
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'PrevSearch',
  }
);

module.exports = PrevSearch;
