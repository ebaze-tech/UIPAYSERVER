const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/Login");

// Login route
router.post("/login", LoginController.login);

// Logout route
router.post("/logout", LoginController.logout);

module.exports = router;
