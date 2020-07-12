const jwtSecret = require("../config/jwtConfig");
const jwt = require("jsonwebtoken");
const nextLogger = require("../utils/logger");
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  log: ["query", "warn"],
});

module.exports = (req, res) => {
  passport.authenticate("signin", async (err, user, info) => {
    if (err) {
      nextLogger({
        level: "error",
        title: "User login error",
        message: err,
      });
      return res.status(400).json(err);
    }
    if (info != undefined) {
      nextLogger({
        level: "error",
        title: "User login info error",
        message: err,
      });
      return res.status(400).json(info.message);
    } else {
      try {
        console.log("env local", jwtSecret().secret);
        const token = jwt.sign({ user }, jwtSecret().secret);
        // const login = await prisma.login.create({
        //   data: {
        //     user: {
        //       connect: {
        //         id: user.id,
        //         email: user.email,
        //       },
        //     },
        //   },
        // });

        return res.status(200).json({
          auth: true,
          token: token,
          message: `User logged in successfully`,
        });
      } catch (err) {
        nextLogger({
          level: "error",
          title: "Unhandled error during signin",
          message: err,
        });
        return res.status(500).json(err);
      }
    }
  })(req, res);
};
