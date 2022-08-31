const { Order } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createOrder = async (req, res) => {
  const { userId } = req.user;
  const { orderItems } = req.body;

  if (!orderItems?.length) {
    throw new CustomError.BadRequestError("No orders found.");
  }

  await Promise.all(
    orderItems.map((item) => {
      return Order.create({
        user: userId,
        product_id: item.product_id,
        order_item: {
          name: item.name,
          image: item.images[0],
          price: item.price,
          seller: item.seller_name,
        },
      });
    })
  );

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Orders placed successfully." });
};

module.exports = { createOrder };
