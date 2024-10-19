const { DataTypes } = require("sequelize");
const sequelize = require("../../../DatabaseServer/db");

const Student = sequelize.define(
  "Student",
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
          args: [6],
          msg: "Number must be 6 digits long.",
        },
      },
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otherNames: {
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
    hall: {
      type: DataTypes.STRING,
      allowNull: false,
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
Student.createStudent = async ({ email, password, number }) => {
  return await Student.create({ email, password, number });
};

Student.findByEmail = async (email) => {
  return await Student.findOne({ where: { email } });
};

Student.findByNumber = async (number) => {
  return await Student.findOne({ where: { number } });
};

Student.findById = async (id) => {
  return await Student.findByPk(id);
};

module.exports = Student; // Export the model directly
