const winston = require('winston');
require('winston-daily-rotate-file');
const dateFormat = require('dateformat');
const path = require('path');

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${dateFormat(timestamp, 'yyyy-mm-dd HH:MM:ss')}] [${label}] [${level.toUpperCase()}] ${message}`;
});

const options = {
  dailyFile: {
    level: 'info',
    filename: path.resolve(__dirname, 'log', 'server', 'server_%DATE%.log'),
    handleException: true,
    json: false,
    colorsize: false,
    datePattern: 'YYYYMMDD',
    zippedArchive: true,
    maxFiles: '14d',
    format: combine(
      label({ label: 'EXPRESS' }),
      timestamp(),
      myFormat
    )
  },
  console: {
    level: 'debug',
    handleException: true,
    json: false,
    colorsize: true,
    format: combine(
      label({ label: 'EXPRESS' }),
      timestamp(),
      myFormat
    )
  }
}

let logger = new winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.DailyRotateFile(options.dailyFile)
  ],
  exitOnError: false
});

module.exports = logger;