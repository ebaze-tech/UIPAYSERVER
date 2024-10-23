const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../DatabaseServer/db");

const Manufacturer = sequelize.define(
  "Manufacturer",
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
Manufacturer.createAdmin = async ({ email, password, number }) => {
  return await Manufacturer.create({ email, password, number });
};

Manufacturer.findByEmail = async (email) => {
  return await Manufacturer.findOne({ where: { email } });
};

Manufacturer.findByNumber = async (number) => {
  return await Manufacturer.findOne({ where: { number } });
};

Manufacturer.findById = async (id) => {
  return await Manufacturer.findByPk(id);
};

module.exports = Manufacturer;
