const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("HospitalDB", "root", "Mayachaker.mc2025", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL ");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

module.exports = sequelize;
