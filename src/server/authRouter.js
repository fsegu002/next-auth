const express = require("express");
const authRouter = express.Router();
const registration = require("../auth/registration");

authRouter.post("/register", registration);

module.exports = authRouter;
