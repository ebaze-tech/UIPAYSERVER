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
      type: DataTypes.BLOB,
      allowNull: false,
    },
    schoolSecurityReport: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    affidavit: {
      type: DataTypes.BLOB,
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
