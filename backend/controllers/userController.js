const { User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(StatusCodes.OK).json({ users, nbHits: users.length });
};
const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ where: { user_id: userId } });
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }
  res.status(StatusCodes.OK).json({ user });
};
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
};
