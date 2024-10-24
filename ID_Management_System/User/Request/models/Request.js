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
      type: DataTypes.ENUM(
        "StudentReplacement",
        "StudentUpgrade",
        "StudentApplication"
      ),
      allowNull: false,
    },
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
    timestamps: false,
  }
);

module.exports = Requests;
