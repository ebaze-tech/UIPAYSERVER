const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// const app = express
//require("./DatabaseServer/db");

const { Sequelize } = require("sequelize");
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT ? process.env.PORT : 5000;
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
  .then(() => {
    console.log("Database connected...");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error:" + error);
    process.exit(1);
  });

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
  // session({
  //   secret: process.env.JWT_SECRET,
  //   resave: false,
  //   saveUninitialized: true,
  // })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const UserRegistrationAccounts = require("./User/Accounts/routes/Register");
const UserLoginAccounts = require("./User/Accounts/routes/Login");

const StudentIdApplication = require("./User/IdApplication/routes/Student");
const StaffIdApplication = require("./User/IdApplication/routes/Staff");

const StudentIdReplacement = require("./User/IdReplacement/routes/Student");
const StaffIdReplacement = require("./User/IdReplacement/routes/Staff");

const StaffIdUpgrade = require("./User/IdUpgrade/routes/Staff");
const StudentIdUpgrade = require("./User/IdUpgrade/routes/Student");

const Passwords = require("./User/Password/routes/Password");

app.use("/api/idcard/application", StudentIdApplication);
app.use("/api/idcard/application", StaffIdApplication);

app.use("/api/idcard/replacement", StudentIdReplacement);
app.use("/api/idcard/replacement", StaffIdReplacement);

app.use("/api/idcard/upgrade", StudentIdUpgrade);
app.use("/api/idcard/upgrade", StaffIdUpgrade);

app.use("/api/accounts/auth", UserRegistrationAccounts);
app.use("/api/accounts/auth", UserLoginAccounts);
// app.use("/api/accounts/auth", AdminAccount);
app.use("/api/accounts/password", Passwords);
