const HttpStatus = require('http-status-codes');
const nextLogger = require('../../utils/logger');
const { PrismaClient } = require('@prisma/client');
const { http } = require('winston');
const prisma = new PrismaClient({
    log: ['query', 'warn']
});

module.exports = async (req, res, next) => {
    try {
        const user = await prisma.user.findOne({
            where: {
                id: parseInt(req.params.userId)
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
            }
        });
        res.status(HttpStatus.OK).json(user);
    } catch (err) {
        nextLogger({
            level: 'error',
            title: 'Get user failed',
            message: err
        });
        res.status(HttpStatus.BAD_REQUEST).json({
            message: 'Get user request failed'
        });
    }
};
