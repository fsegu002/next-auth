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
      return res.status(400).json({ message: err });
    }
    if (info != undefined) {
      nextLogger({
        level: "error",
        title: "User login info error",
        message: info.message,
      });
      return res.status(400).json({ message: info.message });
    } else {
      try {
        const token = jwt.sign({ user }, jwtSecret().secret);
        const login = await prisma.login.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });

        return res.status(200).json({
          auth: true,
          token: token,
          message: `User logged in successfully at ${login.lastLogin}`,
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
