const { Product, Review } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  req.body.seller_name = req.user.name;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.findAll({
    include: { model: Review, as: "reviews" },
  });
  res.status(StatusCodes.OK).json({ products, nbHits: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({
    where: { product_id: productId },
    include: { model: Review, as: "reviews" },
  });
  if (!product) {
    throw new CustomError.NotFoundError("Product not found.");
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ where: { product_id: productId } });

  if (!product) {
    throw new CustomError.NotFoundError("Product not found.");
  }
  product.set(req.body);
  const updatedProduct = await product.save();
  res.status(StatusCodes.OK).json({ product: updatedProduct });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.destroy({ where: { product_id: productId } });
  if (!product) {
    throw new CustomError.NotFoundError("Product not found.");
  }
  res.status(StatusCodes.NO_CONTENT).json({ message: "Product was removed" });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
};
