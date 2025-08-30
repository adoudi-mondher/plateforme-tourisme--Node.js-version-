// models/Appointment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Appointment = sequelize.define("Appointment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  service_name: { type: DataTypes.STRING, allowNull: false },
  appointment_date: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "confirmed" }
}, {
  tableName: "appointments",
  timestamps: false
});

// Relation avec User
Appointment.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Appointment, { foreignKey: "user_id" });

module.exports = Appointment;
