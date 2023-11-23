const CustomError = require("../errors");
const { verifyJWT } = require("../utils");

// checks if user is logged in and has a valid jwt token

const authenticateUser = async (req, res, next) => {
  // as we have attached signed cookie
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnAuthenticatedError("User is not authorized.");
  }
  try {
    const { username, userId, role } = verifyJWT(token);
    req.user = { username, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnAuthenticatedError("User authorization failed.");
  }
};

// using a wrapper function that returns a callback so we can accept parameters with rest operator
// roles stores an array of authorized user roles
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnAuthorizedError(
        "Unauthorized to accesss this route."
      );
    }
    // proceed if user has permissions
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
