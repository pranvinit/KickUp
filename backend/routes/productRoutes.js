const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  addToCart,
  removeFromCart,
  getCartItems,
} = require("../controllers/productController");

router.route("/").get(getAllProducts).post(createProduct);

router
  .route("/cart")
  .get(authenticateUser, getCartItems)
  .post(authenticateUser, addToCart)
  .delete(authenticateUser, removeFromCart);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authenticateUser, updateProduct)
  .delete(authenticateUser, deleteProduct);

module.exports = router;
