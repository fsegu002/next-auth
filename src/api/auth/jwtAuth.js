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

    const response = {
      status: HttpStatus.OK,
      auth: true,
      ...user
    };
    nextLogger({
      level: 'error',
      title: 'JWT auth error',
      message: response
    });
    res.status(HttpStatus.OK).json(response);
  })(req, res, next);
};
