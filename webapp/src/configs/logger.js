import 'winston-daily-rotate-file';
import winston from 'winston';
import path from 'path';

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
    dirname: path.join('logs'),
    filename: 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '15d',
});

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
            return `${timestamp} ${level}: ${message} - ${stack}`;
        }),
    ),
    transports: [dailyRotateFileTransport],
});

// Log to console in development
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    );
}

export default logger;
