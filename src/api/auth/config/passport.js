/* eslint-disable new-cap */
const jwtSecret = require('./jwtConfig');
const bcrypt = require('bcrypt');
const nextLogger = require('../../../utils/logger');
const models = require('../../../db/models');
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
        const user = await models.User.findAll({
          where: {
            email
          }
        });

        if (user.length) {
          return done(null, false, { message: 'Username is not available' });
        } else {
          const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
          const newUser = await models.User.create({
            email,
            password: hash
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
        const user = await models.User.findOne({
          where: { email },
          attributes: { include: ['password'] }
        });

        if (user === null) {
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

        delete user.dataValues.password;

        return done(null, user.dataValues);
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
