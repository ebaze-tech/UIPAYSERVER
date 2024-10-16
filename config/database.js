const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      charset: "utf8mb4",
    },
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;

// In app.js or database configuration file
sequelize
  .sync({ force: false }) // or alter: true, to update existing schema
  .then(() => console.log("Database & tables synced successfully"))
  .catch((err) => console.log("Error syncing database: ", err));

// const PasswordResetToken = require('../models/password/PasswordResetToken');

// (async () => {
//   try {
//     await PasswordResetToken.sync({ force: false }); // force: false ensures table isn't dropped if it exists
//     console.log('PasswordResetToken table created successfully.');
//   } catch (error) {
//     console.error('Error creating PasswordResetToken table:', error);
//   }
// })();
