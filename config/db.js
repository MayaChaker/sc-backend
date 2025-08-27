const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL ");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

module.exports = sequelize;
