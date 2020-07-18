const express = require('express');
const authRouter = express.Router();
const config = require('./config');
const registration = require('../api/auth/registration');
const signIn = require('../api/auth/signin');
const jwtAuth = require('../api/auth/jwtAuth');

authRouter.post(config.endPoints.register, registration);
authRouter.post(config.endPoints.signin, signIn);
authRouter.post(config.endPoints.jwt_auth, jwtAuth);

module.exports = authRouter;
