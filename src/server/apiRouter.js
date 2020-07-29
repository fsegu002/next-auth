const express = require('express');
const apiRouter = express.Router();
const registration = require('../api/auth/registration');
const signIn = require('../api/auth/signin');
const jwtAuth = require('../api/auth/jwtAuth');
const { getUser } = require('../api/users');

const path = {
  auth: '/auth',
  users: '/users'
};

/**
 * Auth
 */
apiRouter.post(`${path.auth}/register`, registration);
apiRouter.post(`${path.auth}/signin`, signIn);

/**
 * User
 */
apiRouter.get(`${path.users}/:userId`, jwtAuth, getUser);

module.exports = apiRouter;
