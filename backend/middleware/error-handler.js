const { StatusCodes } = require("http-status-codes");

// overwrites the default express async error handler
const errorHandlerMiddleWare = (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong try again later",
    statusCode: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  console.log(err);

  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleWare;
