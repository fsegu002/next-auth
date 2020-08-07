const passport = require('passport');
const nextLogger = require('../../utils/logger');
const HttpStatus = require('http-status-codes');
const models = require('../../db/models');

module.exports = (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      nextLogger({
        level: 'error',
        title: 'User registration error',
        message: err
      });
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.toString() });
    }
    if (info) {
      nextLogger({
        level: 'error',
        title: 'User registration info error',
        message: info.message
      });
      return res.status(HttpStatus.BAD_REQUEST).json({ message: info.message });
    }

    // HERE we could use req.logIn to login user automatically

    return res.status(HttpStatus.CREATED).json(user);
  })(req, res, next);
};
