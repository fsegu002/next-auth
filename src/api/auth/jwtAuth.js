const HttpStatus = require('http-status-codes');
const passport = require('passport');
const nextLogger = require('../../utils/logger');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      nextLogger({
        level: 'error',
        title: 'JWT auth error',
        message: err
      });
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err });
    }
    if (info != undefined) {
      nextLogger({
        level: 'error',
        title: 'User login info error',
        message: info.message
      });
      return res.status(HttpStatus.BAD_REQUEST).json({ message: info.message });
    } else {
      res.status(HttpStatus.OK).json({
        status: res.status,
        auth: true,
        ...user
      });
    }
  })(req, res, next);
};
