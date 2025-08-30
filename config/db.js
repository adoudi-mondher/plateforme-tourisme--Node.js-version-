// config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("yc0vd_sheisthegoal", "yc0vd_nassim", "#gTz%r0w5W@F63PP", {
  host: "yc0vd.myd.infomaniak.com",
  dialect: "mysql",
  logging: false
});

module.exports = sequelize;
