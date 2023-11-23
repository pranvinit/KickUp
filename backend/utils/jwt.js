const jwt = require("jsonwebtoken");

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {});
  console.log(token);
  return token;
};

// return decoded payload
const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);

// executes on register and login
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT(user);
  // setting cookie expiry to 24 hours
  const duration = 1 * 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + duration),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  verifyJWT,
  attachCookiesToResponse,
};
