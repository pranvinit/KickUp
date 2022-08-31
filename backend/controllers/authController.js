const { User, Review, Order } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new CustomError.BadRequestError("Please provide all the values.");
  }
  const user = await User.create({ username, email, password });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  return res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password.");
  }
  const user = await User.findOne({
    where: { email: email },
    include: [
      { model: Review, as: "reviews" },
      { model: Order, as: "orders" },
    ],
  });
  if (!user) {
    throw new CustomError.UnAuthenticatedError("Invalid Credentials.");
  }
  // Instance method on the user schema
  const isPasswordCorrect = await user.comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnAuthenticatedError("Invalid Credentials.");
  }
  const tokenUser = createTokenUser(user);
  // creating JWT token and attaching it to the response
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  // setting cookie to some string and expires to Date.now()
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out." });
};

module.exports = { register, login, logout };
