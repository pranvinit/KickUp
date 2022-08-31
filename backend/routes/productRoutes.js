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
  .patch(authenticateUser, updateProduct)
  .delete(authenticateUser, deleteProduct);

module.exports = router;