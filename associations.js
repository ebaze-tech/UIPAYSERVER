const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./config/database");

// Staff Model
const Staff = sequelize.define(
  "Staff",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false },
    number: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

// Student Model
const Student = sequelize.define(
  "Student",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false },
    number: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

// Request Model
const Request = sequelize.define(
  "Request",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    staffId: {
      type: DataTypes.INTEGER,
      references: { model: "Staff", key: "id" },
      allowNull: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: { model: "Student", key: "id" },
      allowNull: true,
    },
    staffApplicationId: {
      type: DataTypes.INTEGER,
      references: { model: "StaffApplication", key: "id" },
      allowNull: true,
    },
    studentApplicationId: {
      type: DataTypes.INTEGER,
      references: { model: "StudentApplication", key: "id" },
      allowNull: true,
    },
    status: { type: DataTypes.STRING },
    rejected: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  { timestamps: true }
);

// Payment Model
const Payment = sequelize.define(
  "Payment",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    request_id: {
      type: DataTypes.INTEGER,
      references: { model: "Request", key: "id" },
    },
    status: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
    payment_status: {
      type: DataTypes.ENUM("Pending", "Successful", "Unsuccessful"),
      defaultValue: "Pending",
    },
    verified_at: { type: DataTypes.DATE, allowNull: true },
  },
  { timestamps: true }
);

// Notification Model
const Notification = sequelize.define(
  "Notification",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    message: { type: DataTypes.STRING, allowNull: false },
    readMessage: { type: DataTypes.BOOLEAN, defaultValue: false },
    secondAdminId: {
      type: DataTypes.INTEGER,
      references: { model: "Admins", key: "id" },
      allowNull: true,
    },
  },
  { timestamps: true }
);

// Associations
// Staff Associations
Staff.hasMany(Request, { foreignKey: "staffId", as: "Requests" });

// Student Associations
Student.hasMany(Request, { foreignKey: "studentId", as: "Requests" });

// Request Associations
Request.belongsTo(Staff, { foreignKey: "staffId", as: "Staff" });
Request.belongsTo(Student, { foreignKey: "studentId", as: "Student" });
Request.belongsTo(StaffApplication, {
  foreignKey: "staffApplicationId",
  as: "StaffApplication",
});
Request.belongsTo(StudentApplication, {
  foreignKey: "studentApplicationId",
  as: "StudentApplication",
});

// Payment Associations
Payment.belongsTo(Request, { foreignKey: "request_id", as: "Request" });

// Notification Associations
Notification.belongsTo(Admin, {
  foreignKey: "secondAdminId",
  as: "SecondAdmin",
});

// Sync models with the database
sequelize
  .sync({ force: false })
  .then(() => console.log("Database synchronized"))
  .catch((error) => console.error("Error synchronizing database:", error));

module.exports = {
  sequelize,
  Staff,
  Student,
  Request,
  Payment,
  Notification,
};

console.log(Staff.associations);
console.log(Student.associations);
console.log(Request.associations);
console.log(Notification.associations);
