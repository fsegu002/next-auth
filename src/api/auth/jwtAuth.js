const HttpStatus = require('http-status-codes');
const passport = require('passport');
const nextLogger = require('../../utils/logger');
const models = require('../../db/models');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      nextLogger({
        level: 'error',
        title: 'JWT auth error',
        message: err
      });
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: err });
    }
    if (info) {
      nextLogger({
        level: 'error',
        title: 'JWT info error',
        message: info.message
      });
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: info.message });
    }

    const userId = req.params.userId;
    if (userId == user.userId) {
      const userFromDB = await models.User.findOne({ id: user.userId });
      req.user = userFromDB.dataValues;
      return next();
    }

    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
  })(req, res, next);
};
