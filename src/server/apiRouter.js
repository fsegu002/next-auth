const express = require('express');
const apiRouter = express.Router();
const registration = require('../api/auth/registration');
const signIn = require('../api/auth/signin');
const jwtAuth = require('../api/auth/jwtAuth');
const getUser = require('../api/users/getUser');

/**
 * Auth
 */
apiRouter.post('/auth/register', registration);
apiRouter.post('/auth/signin', signIn);
apiRouter.post('/authjwt_auth', jwtAuth);

/**
 * User
 */
apiRouter.get('/users/:userId', getUser);

module.exports = apiRouter;
