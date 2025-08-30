// models/Feedback.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Feedback = sequelize.define("Feedback", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  opinion: { type: DataTypes.TEXT, allowNull: false },
  media_path: { type: DataTypes.STRING },
  media_type: { type: DataTypes.STRING },
  submitted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "feedback",
  timestamps: false
});

// Relation avec User
Feedback.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Feedback, { foreignKey: "user_id" });

module.exports = Feedback;
