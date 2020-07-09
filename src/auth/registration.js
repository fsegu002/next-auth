const HttpStatus = require("http-status-codes");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
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

  try {
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, async function (err, hash) {
      if (err) console.error(err);

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

      res.status(HttpStatus.CREATED).json(user);
    });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
};

module.exports = registration;
