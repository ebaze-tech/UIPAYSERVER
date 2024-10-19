const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Request = sequelize.define("Request", {
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
      allowNull: false, // Either 'Staff' or 'Student'
    },
    requestType: {
      type: DataTypes.STRING,
      allowNull: false, // 'Replacement', 'Application', 'Upgrade'
    },
    paymentId: {
      type: DataTypes.INTEGER,
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
  });

  // Request.associate = (models) => {
  //   Request.belongsTo(models.Staff, { foreignKey: "userId", as: "Staff" });
  //   Request.belongsTo(models.Student, { foreignKey: "userId", as: "Student" });
  //   Request.belongsTo(models.Payment, {
  //     foreignKey: "paymentId",
  //     as: "Payment",
  //   });
  // };

  return Request;
};
