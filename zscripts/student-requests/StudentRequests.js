const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
// const StudentApplicationModel = require("../../application/Student");
// const StudentReplacementModel = require("../../replacement/Student");
// const StudentUpgradeModel = require("../../upgrade/Student");

const Request = sequelize.define("Request", {
  type: {
    type: DataTypes.STRING, // "application", "replacement", "upgrade"
    allowNull: false,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING, // "pending", "approved", "rejected"
    defaultValue: "Pending",
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requestType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// // Polymorphic associations
// StudentApplicationModel.hasMany(Request, {
//   foreignKey: "userId",
//   constraints: false,
//   scope: {
//     userType: "StudentApplication", // restricts to application requests
//   },
// });

// StudentReplacementModel.hasMany(Request, {
//   foreignKey: "userId",
//   constraints: false,
//   scope: {
//     userType: "StudentReplacement", // restricts to replacement requests
//   },
// });

// StudentUpgradeModel.hasMany(Request, {
//   foreignKey: "userId",
//   constraints: false,
//   scope: {
//     userType: "StudentUpgrade", // restricts to upgrade requests
//   },
// });

// Request.belongsTo(StudentApplicationModel, {
//   foreignKey: "userId",
//   constraints: false,
// });
// Request.belongsTo(StudentReplacementModel, {
//   foreignKey: "userId",
//   constraints: false,
// });
// Request.belongsTo(StudentUpgradeModel, {
//   foreignKey: "userId",
//   constraints: false,
// });

module.exports = Request;
