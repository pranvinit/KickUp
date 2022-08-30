const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-api");
const NotFoundError = require("./not-found");
const UnAuthenticatedError = require("./unauthenticated");
const UnAuthorizedError = require("./unauthorized");

module.exports = {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
  UnAuthenticatedError,
  UnAuthorizedError,
};
