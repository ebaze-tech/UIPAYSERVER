const { Model, DataTypes } = require("sequelize");
const {sequelize} = require("../../../DatabaseServer/db");

class StaffReplacement extends Model {}

StaffReplacement.init(
  {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    affidavit: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    schoolSecurityReport: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    passport: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
  },
  {
    sequelize,
    modelName: "StaffReplacement",
  }
);

module.exports = StaffReplacement;
