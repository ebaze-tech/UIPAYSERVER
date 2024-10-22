const { Model, DataTypes } = require("sequelize");
const {sequelize} = require("../../../DatabaseServer/db");

class StaffUpgrade extends Model {}

StaffUpgrade.init(
  {
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
    passport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schoolSecurityReport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    affidavit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "StaffUpgrade",
  }
);

module.exports = StaffUpgrade;
