const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../../DatabaseServer/db");

class StudentReplacement extends Model {}

StudentReplacement.init(
  {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    affidavit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schoolSecurityReport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passport: {
      type: DataTypes.STRING,
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
    modelName: "StudentReplacement",
  }
);

module.exports = StudentReplacement;
