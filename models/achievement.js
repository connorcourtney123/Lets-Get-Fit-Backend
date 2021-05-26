'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.achievement.belongsToMany(models.user, { through: 'user_achievement'})
    }
  };
  achievement.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'achievement',
  });
  return achievement;
};