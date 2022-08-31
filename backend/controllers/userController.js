const { User, Review } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.findAll({
    include: { model: Review, as: "reviews" },
  });
  res.status(StatusCodes.OK).json({ users, nbHits: users.length });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({
    where: { user_id: userId },
    include: { model: Review, as: "reviews" },
  });
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({
    where: { user_id: userId },
    include: { model: Review, as: "reviews" },
  });
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ where: { user_id: userId } });
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }
  user.set(req.body);
  const updatedUser = await user.save();
  res.status(StatusCodes.OK).json({ user: updatedUser });
};

const deleteUser = async (req, res) => {
  const { userId } = req.user;

  const user = await User.destroy({ where: { user_id: userId } });
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }
  res.status(StatusCodes.NO_CONTENT).json({ message: "User was removed" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  deleteUser,
};
