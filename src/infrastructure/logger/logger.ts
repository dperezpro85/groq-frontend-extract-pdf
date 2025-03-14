import winston, {format} from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Formato legible
        format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" })
    ],
});

export default logger;
