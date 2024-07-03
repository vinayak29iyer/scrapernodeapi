import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

/**
 * @usage // logger.info('Hello, this is an informational log!'); logger.error('Oops, something went wrong!');
 */
const logger = winston.createLogger({
  level: winston.config.npm.levels, // Use npm log levels
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new DailyRotateFile({
      level: 'info', // Log level
      filename: './logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD', // Daily rotation
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d' 
    }),
    new DailyRotateFile({
        level: 'error', // Log level
        filename: './logs/application-error-%DATE%.log',
        datePattern: 'YYYY-MM-DD', // Daily rotation
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d' 
    })
  ]
});
export {logger}