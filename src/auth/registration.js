const HttpStatus = require("http-status-codes");
const bcrypt = require("bcrypt");
const nextLogger = require("../utils/logger");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  log: ["query", "warn"],
});

const BCRYPT_SALT_ROUNDS = 12;

const registration = (req, res) => {
  const {
    email,
    password,
    passwordConfirmation,
    firstName,
    lastName,
  } = req.body.user;

  if (password !== passwordConfirmation) {
    nextLogger({
      level: "error",
      title: "Password validation failed",
      message: "Password does not match confirmation",
    });
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "Password doesn't match confirmation.",
    });
  }

  bcrypt.hash(password, BCRYPT_SALT_ROUNDS, async (err, hash) => {
    if (err) {
      nextLogger({
        level: "error",
        title: "Hashing password failed",
        message: err,
      });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hash,
          passwordConfirmation: hash,
          firstName,
          lastName,
        },
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      });

      nextLogger({
        title: "Registered new user",
        message: `Email: ${user.email}`,
      });
      return res.status(HttpStatus.CREATED).json(user);
    } catch (err) {
      nextLogger({
        level: "error",
        title: "User registration failed",
        message: err,
      });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  });
};

module.exports = registration;
