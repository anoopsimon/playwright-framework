// src/logger.ts
import { createLogger, format, transports } from 'winston';
import path from 'path';

// Define the log file path
const logFilePath = path.join(__dirname, '../logs/app.log');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logFilePath }) // Add file transport
  ],
});

export default logger;
