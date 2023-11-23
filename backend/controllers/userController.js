const { User, Review, Order } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// Cache imports
const redisClient = require("../cache/redisClient");
const { getFromCache, setWithExpire } = require("../utils/redisCacheHelper");

const getAllUsers = async (req, res) => {
  const users = await User.findAll({
    include: [
      { model: Review, as: "reviews" },
      { model: Order, as: "orders" },
    ],
  });
  res.status(StatusCodes.OK).json({ users, nbHits: users.length });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;

  // Check cache first
  const cachedUser = await getFromCache(userId);
  if (cachedUser)
    return res
      .status(StatusCodes.OK)
      .json({ user: cachedUser, message: "Retrieved from cache." });

  const user = await User.findOne({
    where: { user_id: userId },
    include: [
      { model: Review, as: "reviews" },
      { model: Order, as: "orders" },
    ],
  });
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }

  // Cache user data
  setWithExpire(userId, user);

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({
    where: { user_id: userId },
    include: [
      { model: Review, as: "reviews" },
      { model: Order, as: "orders" },
    ],
  });
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }
  user.set(req.body);
  const updatedUser = await user.save();

  // Revalidate cache
  setWithExpire(userId, updatedUser);

  res.status(StatusCodes.OK).json({ user: updatedUser });
};

const deleteUser = async (req, res) => {
  const { userId } = req.user;

  const user = await User.destroy({ where: { user_id: userId } });
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }

  // Delete cache
  redisClient.del(userId);

  res.status(StatusCodes.NO_CONTENT).json({ message: "User was removed" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  deleteUser,
};
