const express = require("express");
const authRouter = express.Router();
const registration = require("../auth/registration");
const signIn = require("../auth/signin");
const jwtAuth = require("../auth/jwtAuth");

authRouter.post("/register", registration);
authRouter.post("/signin", signIn);
authRouter.post("/jwt_auth", jwtAuth);

module.exports = authRouter;
