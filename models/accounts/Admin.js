const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

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

// SYNC MODEL WITH DB
// sequelize
//   .sync()
//   .then(() => console.log("Admin table created successfully."))
//   .catch((err) => console.log("Error creating admin table: ", err));

class AdminModel {
  static async create({ email, password, number }) {
    return await Admin.create({ email, password, number });
  }

  static async findByEmail(email) {
    return await Admin.findOne({ where: { email } });
  }

  static async findByNumber(number) {
    return await Admin.findOne({ where: { number } });
  }
  static async findById(id) {
    return await Admin.findByPk(id);
  }
}
module.exports = AdminModel;
