'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Login, User }) {
      // define association here
      Login.belongsTo(User, {
        foreignKey: 'userId'
      });
    }
  }
  Login.init(
    {
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Login'
    }
  );
  return Login;
};
