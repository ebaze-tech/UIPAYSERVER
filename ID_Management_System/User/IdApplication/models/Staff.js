const { DataTypes, Model } = require("sequelize");
const {sequelize} = require("../../../DatabaseServer/db");

class StaffApplication extends Model {}

StaffApplication.init(
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
    position: {
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
    designation: {
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
    modelName: "StaffApplication",
  }
);

module.exports = StaffApplication;
