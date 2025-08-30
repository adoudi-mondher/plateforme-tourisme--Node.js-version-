// config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("yc0vd_sheisthegoal", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

module.exports = sequelize;
