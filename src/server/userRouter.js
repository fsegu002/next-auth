const express = require('express');
const userRouter = express.Router();
const getUser = require('../api/users/getUser');

userRouter.get('/:userId', getUser);

module.exports = userRouter;
