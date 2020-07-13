const passport = require("passport");
const nextLogger = require("../utils/logger");
const HttpStatus = require("http-status-codes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  log: ["query", "warn"],
});

module.exports = (req, res, next) => {
  const { password, passwordConfirmation } = req.body;
  if (password !== passwordConfirmation) {
    nextLogger({
      level: "error",
      title: "Password verification failed",
      message: "Password does not match confirmation",
    });
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "Password does not match confirmation",
    });
  }
  passport.authenticate("register", (err, user, info) => {
    if (err) {
      nextLogger({
        level: "error",
        title: "User registration error",
        message: err,
      });
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err });
    }
    if (info != undefined) {
      nextLogger({
        level: "error",
        title: "User registration info error",
        message: info.message,
      });
      return res.status(HttpStatus.BAD_REQUEST).json({ message: info.message });
    } else {
      req.logIn(user, async (err) => {
        const updatedUser = await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          },
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        });
        return res.status(HttpStatus.CREATED).json(updatedUser);
      });
    }
  })(req, res, next);
};
