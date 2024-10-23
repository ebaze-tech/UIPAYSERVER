const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../DatabaseServer/db");

const SuperAdmin = sequelize.define(
  "SuperAdmin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [8],
          msg: "Number must be 8 digits long.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    timestamps: true,
  }
);

// Model methods as static methods
SuperAdmin.createAdmin = async ({ email, password, number }) => {
  return await SuperAdmin.create({ email, password, number });
};

SuperAdmin.findByEmail = async (email) => {
  return await SuperAdmin.findOne({ where: { email } });
};

SuperAdmin.findByNumber = async (number) => {
  return await SuperAdmin.findOne({ where: { number } });
};

SuperAdmin.findById = async (id) => {
  return await SuperAdmin.findByPk(id);
};

module.exports = SuperAdmin;
