const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");

class StudentApplication extends Model {}

StudentApplication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    level: {
      type: DataTypes.INTEGER,
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
    modelName: "StudentApplication",
  }
);

module.exports = StudentApplication;
