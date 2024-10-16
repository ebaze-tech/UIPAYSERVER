const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");
// const { Request } = require("../index");

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
  },
  {
    sequelize,
    modelName: "StaffApplication",
  }
);

// StudentApplication.hasMany(Request, {
//   as: "Requests",
//   foreignKey: "studentApplicationId",
// });

module.exports = StaffApplication;
