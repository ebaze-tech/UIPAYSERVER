const express = require("express");
const http = require("http");
const cors = require("cors");
const { authenticateDatabase } = require("./DatabaseServer/db");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT ? process.env.PORT : 5000;

// Middlewares and routes setupapp.use(express.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

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

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server running..." });
});

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

// Start the server unless the database is connected
const runServer = async () => {
  const isDbConnected = await authenticateDatabase();

  isDbConnected
    ? startServer()
    : (console.error("Server not started due to database connection failure"),
      process.exit(1));
};

const UserRegistrationAccounts = require("./User/Accounts/routes/Register");
const UserLoginAccounts = require("./User/Accounts/routes/Login");

const StudentIdApplication = require("./User/IdApplication/routes/Student");
const StaffIdApplication = require("./User/IdApplication/routes/Staff");

const StudentIdReplacement = require("./User/IdReplacement/routes/Student");
const StaffIdReplacement = require("./User/IdReplacement/routes/Staff");

const StaffIdUpgrade = require("./User/IdUpgrade/routes/Staff");
const StudentIdUpgrade = require("./User/IdUpgrade/routes/Student");

const Passwords = require("./User/Password/routes/Password");

const AdminRegisterAccounts = require("./Admin/accounts/routes/Register");
const AdminLoginAccounts = require("./Admin/accounts/routes/Login");
const SuperAdminRequests = require("./Admin/superadmin/routes/superAdmin");

app.use("/api/idcard/application", StudentIdApplication);
app.use("/api/idcard/application", StaffIdApplication);

app.use("/api/idcard/replacement", StudentIdReplacement);
app.use("/api/idcard/replacement", StaffIdReplacement);

app.use("/api/idcard/upgrade", StudentIdUpgrade);
app.use("/api/idcard/upgrade", StaffIdUpgrade);

app.use("/api/accounts/auth", UserRegistrationAccounts);
app.use("/api/accounts/auth", UserLoginAccounts);
app.use("/api/accounts/password", Passwords);

app.use("/api/admin", AdminRegisterAccounts);
app.use("/api/admin", AdminLoginAccounts);
app.use("/api/admin/view", SuperAdminRequests);

runServer();
