const { DataTypes, Op } = require("sequelize");
const sequelize = require("../../../DatabaseServer/db");

const PasswordResetToken = sequelize.define(
  "PasswordResetToken",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userType: {
      type: DataTypes.ENUM("Student", "Staff"),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Method to find a token
PasswordResetToken.findToken = async function (token, number) {
  return await this.findOne({
    where: {
      token,
      number,
      expiresAt: { [Op.gt]: Date.now() },
    },
  });
};

// Method to delete a token
PasswordResetToken.deleteToken = async function (id) {
  return await this.destroy({ where: { id } });
};

module.exports = PasswordResetToken;
