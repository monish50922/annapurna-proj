const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Donation = sequelize.define("Donation", {
  food_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  pickup_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  event_type: {
    type: DataTypes.STRING,
    allowNull: true,   // optional field
  },

  status: {
  type: DataTypes.ENUM(
    "AVAILABLE",
    "CLAIMED",
    "PICKED",
    "DELIVERED"
  ),
  defaultValue: "AVAILABLE",
},

  donorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  ngoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// Associations
Donation.belongsTo(User, { as: "donor", foreignKey: "donorId" });
Donation.belongsTo(User, { as: "ngo", foreignKey: "ngoId" });

module.exports = Donation;