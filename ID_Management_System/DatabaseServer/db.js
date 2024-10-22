// DatabaseServer/db.js
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

// Function to authenticate the database connection
const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
};

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  sequelize,
  authenticateDatabase,
};
