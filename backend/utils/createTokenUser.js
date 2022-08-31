const createTokenUser = (user) => {
  console.log(user);
  return {
    userId: user.user_id,
    name: user.username,
    cartItems: user.cart_items,
    orders: user.orders,
    reviews: user.reviews,
    role: user.role,
  };
};
module.exports = createTokenUser;
