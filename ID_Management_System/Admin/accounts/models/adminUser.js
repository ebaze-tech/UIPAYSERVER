const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../DatabaseServer/db");

const Admin = sequelize.define(
  "Admin",
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
Admin.createAdmin = async ({ email, password, number }) => {
  return await Admin.create({ email, password, number });
};

Admin.findByEmail = async (email) => {
  return await Admin.findOne({ where: { email } });
};

Admin.findByNumber = async (number) => {
  return await Admin.findOne({ where: { number } });
};

Admin.findById = async (id) => {
  return await Admin.findByPk(id);
};

module.exports = Admin;
