// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // on fera un fichier db.js pour centraliser Sequelize

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "users",
  timestamps: false
});

module.exports = User;
