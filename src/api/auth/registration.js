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
            return res.status(HttpStatus.BAD_REQUEST).json({ message: err });
        }
        if (info != undefined) {
            nextLogger({
                level: 'error',
                title: 'User registration info error',
                message: info.message
            });
            return res.status(HttpStatus.BAD_REQUEST).json({ message: info.message });
        } else {
            req.logIn(user, async err => {
                const updatedUser = await models.User.update(
                    { firstName: user.firstName, lastName: user.lastName },
                    {
                        where: {
                            email: user.email
                        }
                    }
                );

                return res.status(HttpStatus.CREATED).json(updatedUser);
            });
        }
    })(req, res, next);
};
