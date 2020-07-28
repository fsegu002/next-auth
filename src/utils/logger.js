const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const nextLogger = ({ level = 'info', title = 'log', message } = {}) => {
  const logger = createLogger({
    format: combine(label({ label: title }), timestamp(), prettyPrint()),
    transports: [
      new transports.Console(),
      new winston.transports.File({
        filename: 'combined.log',
        level: 'info'
      }),
      new winston.transports.File({
        filename: 'errors.log',
        level: 'error'
      })
    ]
  });

  logger.log({
    level,
    message
  });
};

module.exports = nextLogger;
