const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../DatabaseServer/db");

class StudentApplication extends Model {}

StudentApplication.init(
  {
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otherNames: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    faculty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hall: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: "StudentApplication",
  }
);

module.exports = StudentApplication;
