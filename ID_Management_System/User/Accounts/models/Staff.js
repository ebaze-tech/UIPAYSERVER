const { DataTypes } = require("sequelize");
const sequelize = require("../../../DatabaseServer/db");

const Staff = sequelize.define(
  "Staff",
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
          args: [4, 5],
          msg: "Number must be 4 or 5 digits long.",
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
Staff.createStaff = async ({ email, password, number }) => {
  return await Staff.create({ email, password, number });
};

Staff.findByEmail = async (email) => {
  return await Staff.findOne({ where: { email } });
};

Staff.findByNumber = async (number) => {
  return await Staff.findOne({ where: { number } });
};

Staff.findById = async (id) => {
  return await Staff.findByPk(id);
};

module.exports = Staff;
