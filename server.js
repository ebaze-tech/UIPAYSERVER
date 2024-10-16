const express = require("express");

const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const app = express();
const sequelize = require("./config/database");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 6377;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// <-------Routes Definitions-------->
const AdminRoutes = require("./routes/accounts/Admin");
const AdminDashboardRoutes = require("./routes/admin/Admin");
const UsersAccounts = require("./routes/accounts/Users");
const StaffIdApplication = require("./routes/application/Staff");
const StudentIdApplication = require("./routes/application/Student");
const StudentIdCardReplacementRoutes = require("./routes/replacement/Student");
const StaffIdCardReplacementRoutes = require("./routes/replacement/Staff");
const StaffIdCardUpgradeRoutes = require("./routes/upgrade/Staff");
const StudentIdCardUpgradeRoutes = require("./routes/upgrade/Student");
const PasswordRoutes = require("./routes/password/PasswordRoutes");
const PaymentRoutes = require("./routes/payment/PaymentRoutes");

// <-------JSON Middleware------->
app.use(express.json());

// <-------Middleware to parse URL-ENCODED BODIES------->
app.use(
  express.urlencoded({
    extended: true,
  })
);

// <-------Static folder to server uploaded files------->
app.use("/uploads", express.static(path.join(__dirname, "uploads", "public")));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Session middleware
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// <----Routes---->

// <----Accounts---->
app.use("/api/accounts", UsersAccounts);
app.use("/api/accounts/admin", AdminRoutes);

// <----Application---->
app.use("/api/idcard/", StudentIdApplication);
app.use("/api/idcard/", StaffIdApplication);

// <----Replacement---->
app.use("/api/idcard/", StudentIdCardReplacementRoutes);
app.use("/api/idcard/", StaffIdCardReplacementRoutes);

// <----Upgrade---->
app.use("/api/idcard", StaffIdCardUpgradeRoutes);
app.use("/api/idcard", StudentIdCardUpgradeRoutes);

// <----Password Recovery---->
app.use("/api/auth/password", PasswordRoutes);

// <----Payment Routes---->
app.use("/api/payments", PaymentRoutes);

// <----Admin Dashboard---->
app.use("/api/admin", AdminDashboardRoutes);

// <----Error handling middleware---->
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
  });
  next();
});

// Multer related errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle multer-specific errors
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Handle general errors
    return res.status(500).json({ message: err.message });
  }
  next();
});

// Default backend route "/"
app.get("/", (req, res) => {
  console.log("This is the API!");
  res.send("This is the API!");
});

//  MySQL connection
// Ensure the database connection is established before starting the server
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL database.");
    return sequelize.sync(); // Ensure all models are synchronized
  })
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit process if connection fails
  });
