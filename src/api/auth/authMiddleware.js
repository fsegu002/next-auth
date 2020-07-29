const HttpStatus = require('http-status-codes');
const nextLogger = require('../../utils/logger');

const isOwnResource = (req, res, next) => {
  if (req.params.userId == req.user.id) {
    return next();
  }

  nextLogger({
    level: 'error',
    title: 'isOwnResource error',
    message: 'User ID did not match current'
  });
  const code = HttpStatus.FORBIDDEN;

  res.status(code).json({ message: HttpStatus.getStatusText(code) });
};

module.exports = {
  isOwnResource
};
