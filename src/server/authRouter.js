const express = require("express");
const authRouter = express.Router();
const registration = require("../auth/registration");
const signIn = require("../auth/signin");

authRouter.post("/register", registration);
authRouter.post("/signin", signIn);

module.exports = authRouter;
