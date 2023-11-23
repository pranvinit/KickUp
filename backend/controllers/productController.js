const { Op } = require("sequelize");
const { User, Product, Review, Sequelize } = require("../models");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// Cache imports
const createQueryHash = require("../utils/createQueryHash");
const { getFromCache, setWithExpire } = require("../utils/redisCacheHelper");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const { prices, colors, designTemplates, types, query, sort } = req.query;
  const queryHash = createQueryHash(req.query);

  const cachedProducts = await getFromCache(queryHash);

  if (cachedProducts) {
    return res.status(StatusCodes.OK).json({
      products: cachedProducts,
      nbHits: cachedProducts.length,
      message: "Retrieved from cache.",
    });
  }

  const whereOptions = {};
  const orderOptions = [];

  if (prices) {
    const priceValues = prices.map((p) => {
      return p.split("-").map((i) => parseInt(i));
    });

    whereOptions.price = {
      [Op.or]: priceValues.map(([ll, ul]) => ({ [Op.between]: [ll, ul] })),
    };
  }
  if (colors) {
    whereOptions.color = {
      [Op.or]: [...colors],
    };
  }
  if (types) {
    whereOptions.type = {
      [Op.or]: [...types],
    };
  }
  if (query) {
    whereOptions[Op.or] = [{ name: { [Op.iLike]: `%${query}%` } }];
  }

  if (sort) {
    orderOptions.push(sort);
  }

  const products = await Product.findAll({
    where: whereOptions,
    order: orderOptions,
    include: { model: Review, as: "reviews", attributes: [] },
    attributes: {
      include: [
        [
          Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
          "average_rating",
        ],
        [Sequelize.fn("COUNT", Sequelize.col("reviews")), "rating_count"],
      ],
    },
    group: ["Product.id"],
  });

  if (designTemplates) {
    const mustHave = Math.min(...designTemplates.map((dt) => parseInt(dt)));
    const filteredProducts = products.filter(
      (item) => Object.keys(item.design).length >= mustHave
    );

    // Cache filtered products
    setWithExpire(queryHash, filteredProducts);
    return res
      .status(StatusCodes.OK)
      .json({ products: filteredProducts, nbHits: filteredProducts.length });
  }

  // Cache products
  setWithExpire(queryHash, products);
  res.status(StatusCodes.OK).json({ products, nbHits: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const cachedProduct = await getFromCache(productId);
  if (cachedProduct)
    return res
      .status(StatusCodes.OK)
      .json({ product: cachedProduct, message: "Retrieved from cache." });

  const product = await Product.findOne({
    where: { product_id: productId },
    include: { model: Review, as: "reviews", attributes: [] },
    attributes: {
      include: [
        [
          Sequelize.fn("AVG", Sequelize.col("reviews.rating")),
          "average_rating",
        ],
        [Sequelize.fn("COUNT", Sequelize.col("reviews")), "rating_count"],
      ],
    },
    group: ["Product.id"],
  });
  if (!product) {
    throw new CustomError.NotFoundError("Product not found.");
  }

  // Cache product
  setWithExpire(productId, product);

  res.status(StatusCodes.OK).json({ product });
};

const addToCart = async (req, res) => {
  const { userId } = req.user;
  const { id: productId } = req.body;

  const user = await User.findOne({ where: { user_id: userId } });
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }

  const isInCart = user.cart_items.includes(productId);
  if (isInCart) {
    throw new CustomError.BadRequestError("Product already in cart.");
  }
  user.set({ cart_items: [...user.cart_items, productId] });
  const updatedUser = await user.save();

  res
    .status(StatusCodes.OK)
    .json({ user: updatedUser, message: "Product added to cart." });
};
const removeFromCart = async (req, res) => {
  const { userId } = req.user;
  const { id: productId } = req.body;

  const user = await User.findOne({ where: { user_id: userId } });
  if (!user) {
    throw new CustomError.NotFoundError("User not found.");
  }

  const isNotInCart = !user.cart_items.includes(productId);
  if (isNotInCart) {
    throw new CustomError.BadRequestError("Product not in cart.");
  }

  const newCartItems = user.cart_items.filter((product_id) => {
    return product_id !== productId;
  });

  user.set({ cart_items: newCartItems });
  const updatedUser = await user.save();

  res
    .status(StatusCodes.OK)
    .json({ user: updatedUser, message: "Product removed from cart." });
};

const getCartItems = async (req, res) => {
  const { userId } = req.user;
  const cartItemsRedisKey = `user:${userId}:cartItems`;

  const cachedCartItems = await getFromCache(cartItemsRedisKey);
  if (cachedCartItems)
    return res.status(StatusCodes.OK).json({
      products: cachedCartItems,
      nbHits: cachedCartItems.length,
      message: "Retrieved from cache.",
    });

  const user = await User.findOne({ where: { user_id: userId } });

  if (!user.cart_items.length) {
    return res.status(StatusCodes.OK).json({ message: "No items in cart." });
  }

  const products = await Promise.all(
    user.cart_items.map((productId) => {
      return Product.findOne({ where: { product_id: productId } });
    })
  );

  // Cache products
  setWithExpire(cartItemsRedisKey, products);

  res.status(StatusCodes.OK).json({ products, nbHits: products.length });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ where: { product_id: productId } });

  if (!product) {
    throw new CustomError.NotFoundError("Product not found.");
  }
  product.set(req.body);
  const updatedProduct = await product.save();

  // Revalidate cache
  setWithExpire(productId, updatedProduct);

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
  addToCart,
  removeFromCart,
  getCartItems,
};
