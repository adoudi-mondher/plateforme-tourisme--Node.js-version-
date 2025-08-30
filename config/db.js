// config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("espace_telmoudi", "root", "250624", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

module.exports = sequelize;
