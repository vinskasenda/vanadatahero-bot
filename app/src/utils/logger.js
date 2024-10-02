import { createLogger, format, transports } from 'winston';
import a6_0x1c2373 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x48a37f,
  message: _0x58ce93,
  timestamp: _0x32b177
}) => {
  return _0x32b177 + " [" + _0x48a37f + "]: " + _0x58ce93;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': "debug",
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': "log/app.log"
      })],
      'exceptionHandlers': [new transports.File({
        'filename': "log/app.log"
      })],
      'rejectionHandlers': [new transports.File({
        'filename': "log/app.log"
      })]
    });
  }
  ["info"](_0x1aa34f) {
    this.logger.info(_0x1aa34f);
  }
  ["warn"](_0x305135) {
    this.logger.warn(_0x305135);
  }
  ['error'](_0x32d11a) {
    this.logger.error(_0x32d11a);
  }
  ["debug"](_0xffd1c7) {
    this.logger.debug(_0xffd1c7);
  }
  ['setLevel'](_0x512811) {
    this.logger.level = _0x512811;
  }
  ["clear"]() {
    a6_0x1c2373.truncate("log/app.log", 0x0, _0x4088f0 => {
      if (_0x4088f0) {
        this.logger.error("Failed to clear the log file: " + _0x4088f0.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();