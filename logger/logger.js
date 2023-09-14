const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "MM-DD-YYYY HH:mm:ss",
    }),
    winston.format.errors({stack: true}),
    winston.format.json()
  ),
  defaultMeta: {service: "user-service"},
  transports: [
    new winston.transports.File({filename: "./logs/error.log", level: "error"}),
    new winston.transports.File({filename: "./logs/combined.log"}),
  ],
  exceptionHandlers: [new winston.transports.File({filename: "./logs/exceptions.log"})],
  rejectionHandlers: [new winston.transports.File({filename: "./logs/rejections.log"})],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({all: true}), winston.format.simple()),
    })
  );
}

module.exports = logger;
