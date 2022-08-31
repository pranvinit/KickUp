const { Order, Product } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createOrder = async (req, res) => {
  const { userId } = req.user;
  const { cartItems } = req.body;

  if (!cartItems?.length) {
    throw new CustomError.BadRequestError("No orders found.");
  }

  const orderItems = await Promise.all(
    cartItems.map((productId) => {
      return Product.findOne({ where: { product_id: productId } });
    })
  );

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
