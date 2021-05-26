'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class strength extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.strength.belongsTo(models.user)
    }
  };
  strength.init({
    userId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    reps: DataTypes.INTEGER,
    sets: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'strength',
  });
  return strength;
};