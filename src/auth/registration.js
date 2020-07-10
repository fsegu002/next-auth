const HttpStatus = require("http-status-codes");
const bcrypt = require("bcrypt");
const nextLogger = require("../utils/logger");
const { PrismaClient } = require("@prisma/client");
const { default: next } = require("next");
const prisma = new PrismaClient();

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
    res.status(HttpStatus.BAD_REQUEST).json({
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
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
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
        },
      });

      nextLogger({
        title: "Registered new user",
        message: `Email: ${user.email}`,
      });
      res.status(HttpStatus.CREATED).json(user);
    } catch (err) {
      nextLogger({
        level: "error",
        title: "User registration failed",
        message: err,
      });
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  });
};

module.exports = registration;
