const express = require('express');
const apiRouter = express.Router();
const registration = require('../api/auth/registration');
const signIn = require('../api/auth/signin');
const jwtAuth = require('../api/auth/jwtAuth');
const { isOwnResource } = require('../api/auth/authMiddleware');
const { getUser, editUser } = require('../api/users');

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
apiRouter.get(`${path.users}/:userId`, [jwtAuth, isOwnResource], getUser);
apiRouter.put(`${path.users}/:userId`, [jwtAuth, isOwnResource], editUser);

module.exports = apiRouter;
