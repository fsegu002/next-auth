const HttpStatus = require('http-status-codes');
const nextLogger = require('../utils/logger');
const models = require('../db/models');

const getUser = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.params.userId }
    });

    res.status(HttpStatus.OK).json(user);
  } catch (err) {
    nextLogger({
      level: 'error',
      title: 'Get user failed',
      message: err
    });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Get user request failed'
    });
  }
};

const editUser = async (req, res, next) => {
  if (req.body.password) {
    nextLogger({
      level: 'error',
      title: 'Edit user password failed',
      message: 'Cannot change password through this api'
    });

    return res.status(HttpStatus.BAD_REQUEST).json({
      message: 'Cannot change password through this api.'
    });
  }
  try {
    const [count, [user]] = await models.User.update(
      { ...req.body },
      {
        returning: true,
        where: { id: req.params.userId }
      }
    );

    delete user.dataValues.password;
    res.status(HttpStatus.OK).json(user);
  } catch (err) {
    nextLogger({
      level: 'error',
      title: 'Edit user failed',
      message: err
    });
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.toString()
    });
  }
};

module.exports = {
  getUser,
  editUser
};
