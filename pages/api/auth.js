const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async (req, res) => {
  const user = await prisma.user
    .findOne({
      where: { id: 1 },
      select: {
        password: false,
        passwordConfirmation: false,
        email: true,
        firstName: true,
      },
    })
    .logins();
  //   const login = await prisma.login.create({
  //     data: {
  //       user: {
  //         connect: {
  //           id: user.id,
  //           email: user.email,
  //         },
  //       },
  //     },
  //   });
  res.statusCode = 200;
  res.json(user);
};
