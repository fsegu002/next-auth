import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async (req, res) => {
    const userLogins = await prisma.user
        .findOne({
            where: { id: parseInt(req.query.userId) },
            select: {
                email: true,
                firstName: true
            }
        })
        .logins();
    res.statusCode = 200;
    res.json(userLogins);
};
