// config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("yc0vd_sheisthegoal", "root", "", {
  host: "yc0vd.myd.infomaniak.com",
  dialect: "mysql",
  logging: false
});

module.exports = sequelize;
