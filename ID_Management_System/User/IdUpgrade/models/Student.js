const { Model, DataTypes } = require("sequelize");
const {sequelize} = require("../../../DatabaseServer/db");

class StudentUpgrade extends Model {}

StudentUpgrade.init(
  {
    number: {
      type: DataTypes.INTEGER,
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
    modelName: "StudentUpgrade",
  }
);

module.exports = StudentUpgrade;
