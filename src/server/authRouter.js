const express = require('express');
const authRouter = express.Router();
const registration = require('../api/auth/registration');
const signIn = require('../api/auth/signin');
const jwtAuth = require('../api/auth/jwtAuth');

authRouter.post('/register', registration);
authRouter.post('/signin', signIn);
authRouter.post('/jwt_auth', jwtAuth);

module.exports = authRouter;
