const jwtSecret = require('./config/jwtConfig');
const jwt = require('jsonwebtoken');
const nextLogger = require('../../utils/logger');
const passport = require('passport');
const HttpStatus = require('http-status-codes');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'warn']
});

module.exports = (req, res) => {
    passport.authenticate('signin', async (err, user, info) => {
        if (err) {
            nextLogger({
                level: 'error',
                title: 'User login error',
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
            try {
                const token = jwt.sign({ user }, jwtSecret().secret, {
                    expiresIn: '24hr'
                });
                const login = await prisma.login.create({
                    data: {
                        user: {
                            connect: {
                                id: user.id
                            }
                        }
                    }
                });

                return res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    auth: true,
                    user,
                    token,
                    message: `User logged in successfully at ${login.lastLogin}`
                });
            } catch (err) {
                nextLogger({
                    level: 'error',
                    title: 'Unhandled error during signin',
                    message: err
                });
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
            }
        }
    })(req, res);
};
