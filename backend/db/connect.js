const { sequelize } = require("../models");

const connectDB = async () => {
  await sequelize.sync();
  return sequelize.authenticate();
};

module.exports = connectDB;
