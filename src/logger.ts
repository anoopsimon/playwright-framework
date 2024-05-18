import { createLogger, format, transports } from 'winston';
import path from 'path';

const logFilePath = path.join(__dirname, '../logs/app.log');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logFilePath }) 
  ],
});

export default logger;
