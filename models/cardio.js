'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cardio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.cardio.belongsTo(models.user)
    }
  };
  cardio.init({
    userId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    distance: DataTypes.FLOAT,
    time: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cardio',
  });
  return cardio;
};