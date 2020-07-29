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
    res.status(HttpStatus.BAD_REQUEST).json({
      message: 'Get user request failed'
    });
  }
};

module.exports = {
  getUser
};
