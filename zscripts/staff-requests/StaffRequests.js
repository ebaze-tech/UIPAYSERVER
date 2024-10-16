const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
// const StaffApplicationModel = require("../../application/Staff");
// const StaffReplacementModel = require("../../replacement/Staff");
// const StaffUpgradeModel = require("../../upgrade/Staff");

const Request = sequelize.define("Request", {
  type: {
    type: DataTypes.STRING, // "application", "replacement", "upgrade"
    allowNull: false,
  },
  staffId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING, // "pending", "approved", "rejected"
    defaultValue: "Pending",
  },
  userType: {
    type: DataTypes.STRING,
  },
  requestType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// // Polymorphic associations
// StaffApplicationModel.hasMany(Request, {
//   foreignKey: "userId",
//   constraints: false,
//   scope: {
//     userType: "StaffApplication", // restricts to application requests
//   },
// });

// StaffReplacementModel.hasMany(Request, {
//   foreignKey: "userId",
//   constraints: false,
//   scope: {
//     userType: "StaffReplacement", // restricts to replacement requests
//   },
// });

// StaffUpgradeModel.hasMany(Request, {
//   foreignKey: "userId",
//   constraints: false,
//   scope: {
//     userType: "StaffUpgrade", // restricts to upgrade requests
//   },
// });

// Request.belongsTo(StaffApplicationModel, {
//   foreignKey: "userId",
//   constraints: false,
// });
// Request.belongsTo(StaffReplacementModel, {
//   foreignKey: "userId",
//   constraints: false,
// });
// Request.belongsTo(StaffUpgradeModel, {
//   foreignKey: "userId",
//   constraints: false,
// });

module.exports = Request;
