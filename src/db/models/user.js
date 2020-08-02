'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Login, User }) {
      // define association here
      User.hasMany(Login, {
        foreignKey: 'userId'
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: 8
        }
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        }
      },
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
