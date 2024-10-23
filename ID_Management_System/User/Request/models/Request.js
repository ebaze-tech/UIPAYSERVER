const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../DatabaseServer/db");

class Requests extends Model {}

Requests.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // paymentId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Requests",
  }
);

module.exports = Requests;
