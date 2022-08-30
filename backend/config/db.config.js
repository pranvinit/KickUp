require("dotenv").config();
const {
  DEV_DATABASE,
  TEST_DATABASE,
  PROD_DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
} = process.env;

module.exports = {
  development: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DEV_DATABASE,
    host: DATABASE_HOST,
    dialect: "postgres",
  },
  test: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: TEST_DATABASE,
    host: DATABASE_HOST,
    dialect: "postgres",
  },
  production: {
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: PROD_DATABASE,
    host: DATABASE_HOST,
    dialect: "postgres",
  },
};
