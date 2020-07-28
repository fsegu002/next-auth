const jwtSecret = require('./config/jwtConfig');
const jwt = require('jsonwebtoken');
const nextLogger = require('../../utils/logger');
const passport = require('passport');
const HttpStatus = require('http-status-codes');
const models = require('../../db/models');

module.exports = (req, res) => {
  passport.authenticate('signin', async (err, user, info) => {
    if (err) {
      nextLogger({
        level: 'error',
        title: 'User login error',
        message: err
      });
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.toString() });
    }
    if (info) {
      nextLogger({
        level: 'error',
        title: 'User login info error',
        message: info.message
      });
      return res.status(HttpStatus.BAD_REQUEST).json({ message: info.message });
    }

    try {
      const token = jwt.sign({ userId: user.id }, jwtSecret().secret, {
        expiresIn: '24hr'
      });
      const login = await models.Login.create({
        userId: user.id
      });

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        auth: true,
        user,
        token,
        message: `User logged in successfully at ${login.createdAt}`
      });
    } catch (err) {
      nextLogger({
        level: 'error',
        title: 'Unhandled error during signin',
        message: err
      });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  })(req, res);
};
