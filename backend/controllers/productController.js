const { Op } = require("sequelize");
const { Product, Review, Sequelize } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  req.body.seller_name = req.user.name;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const { price, color, designTemplate, type } = req.query;

  const whereOptions = {};

  if (price) {
    const [ll, ul] = price.split("-").map((i) => parseInt(i));
    whereOptions.price = { [Op.between]: [ll, ul] };
  }
  if (color) whereOptions.color = color;
  if (type) whereOptions.type = type;

  const products = await Product.findAll({
    where: whereOptions,
    include: { model: Review, as: "reviews", attributes: [] },
    attributes: {
      include: [
        [
          Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
          "average_rating",
        ],
      ],
    },
    group: ["Product.id"],
  });

  if (designTemplate) {
    const filteredProducts = products.filter(
      (item) => Object.keys(item.design).length >= parseInt(designTemplate)
    );
    return res
      .status(StatusCodes.OK)
      .json({ products: filteredProducts, nbHits: filteredProducts.length });
  }

  res.status(StatusCodes.OK).json({ products, nbHits: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({
    where: { product_id: productId },
    include: { model: Review, as: "reviews", attributes: [] },
    attributes: {
      include: [
        [
          Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
          "average_rating",
        ],
      ],
    },
    group: ["Product.id"],
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