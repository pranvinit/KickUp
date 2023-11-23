const { User, Order, Product } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createOrder = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ where: { user_id: userId } });

  if (!user.cart_items?.length) {
    throw new CustomError.BadRequestError("No items in cart.");
  }

  const orderItems = await Promise.all(
    user.cart_items.map((productId) => {
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

  user.set({ cart_items: [] });
  await user.save();

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Orders placed successfully." });
};

const getOrders = async (req, res) => {
  const { userId } = req.user;

  const orders = await Order.findAll({ where: { user: userId } });

  res.status(StatusCodes.OK).json({ orders });
};

module.exports = { createOrder, getOrders };
