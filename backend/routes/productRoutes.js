const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  addToCart,
} = require("../controllers/productController");

router
  .route("/")
  .get(getAllProducts)
  .post(
    [authenticateUser, authorizePermissions("user", "admin")],
    createProduct
  );

router
  .route("/:id")
  .get(getSingleProduct)
  .post(authenticateUser, addToCart)
  .patch(authenticateUser, updateProduct)
  .delete(authenticateUser, deleteProduct);

module.exports = router;
