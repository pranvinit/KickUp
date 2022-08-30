const { Review } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createReview = async (req, res) => {
  const { id: productId } = req.params;
  const { rating } = req.body;
  const { userId } = req.user;

  if (!rating) {
    throw new CustomError.BadRequestError("Please provide rating.");
  }
  const review = await Review.create({
    rating: rating,
    user: userId,
    product: productId,
  });

  res.status(StatusCodes.CREATED).json({ review });
};

module.exports = { createReview };
