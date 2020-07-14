/* eslint-disable new-cap */
const jwtSecret = require('./jwtConfig');
const bcrypt = require('bcrypt');
const nextLogger = require('../../utils/logger');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'warn']
});

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        async (email, password, done) => {
            try {
                const user = await prisma.user.findOne({
                    where: {
                        email
                    }
                });
                if (user != null) {
                    return done(null, false, { message: 'Username is not available' });
                } else {
                    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
                    const newUser = await prisma.user.create({
                        data: {
                            email,
                            password: hash,
                            passwordConfirmation: hash
                        }
                    });
                    return done(null, newUser);
                }
            } catch (err) {
                nextLogger({
                    level: 'error',
                    title: 'User registration info error',
                    message: err
                });
                done(err);
            }
        }
    )
);

passport.use(
    'signin',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        async (email, password, done) => {
            try {
                const user = await prisma.user.findOne({
                    where: {
                        email
                    }
                });

                if (!user) {
                    return done(null, false, { message: 'Username was not found' });
                }
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) {
                    nextLogger({
                        level: 'error',
                        title: 'Password validation failed',
                        message: 'Password did not match'
                    });
                    return done(null, false, { message: 'Password does not match' });
                }
                delete user.password;
                delete user.passwordConfirmation;
                return done(null, user);
            } catch (err) {
                nextLogger({
                    level: 'error',
                    title: 'Unhandled error during signin',
                    message: err
                });
                done(err);
            }
        }
    )
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret().secret
};

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            nextLogger({
                title: 'User jwt',
                message: jwt_payload
            });
            done(null, jwt_payload.user);
        } catch (err) {
            done(err);
        }
    })
);
