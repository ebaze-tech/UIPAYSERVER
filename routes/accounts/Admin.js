const express = require("express");
const router = express.Router();
const AdminController = require("../../controllers/accounts/Admin");

// Register route
router.post("/register", AdminController.register);

// Login route
router.post("/login", AdminController.login);

// Logout route
router.post("/logout", AdminController.logout);
module.exports = router;
