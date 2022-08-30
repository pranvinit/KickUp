const { sequelize } = require("../models");

const connectDB = async () => {
  await sequelize.sync({ force: true });
  return sequelize.authenticate();
};

module.exports = connectDB;
