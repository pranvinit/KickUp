const { sequelize, Product, User } = require("../models");

// seed data
const { USER, ITEMS } = require("../seed/data");

// seed functions
const seedDB = async () => {
  try {
    await User.create(USER);
    await Promise.all(ITEMS.map((item) => Product.create(item)));
  } catch (e) {
    console.log(e);
  }
};

const connectDB = async () => {
  await sequelize.sync({ force: true });
  await seedDB();
  return sequelize.authenticate();
};

module.exports = connectDB;
