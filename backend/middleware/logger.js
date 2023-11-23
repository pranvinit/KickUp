const { appendFile } = require("fs/promises");
const path = require("path");

const logger = async (req) => {
  const logData = `\n${new Date()} - ${req.method} - ${
    req.url
  } - ${JSON.stringify(req.body)}`;

  await appendFile(path.join(__dirname, "..", "logs.txt"), logData);
};

const loggerMiddleware = (req, res, next) => {
  logger(req);
  next();
};

module.exports = loggerMiddleware;
