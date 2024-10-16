const express = require("express");
const router = express.Router();
const RegisterController = require("../../controllers/accounts/RegisterUsers");
const LoginController = require("../../controllers/accounts/LoginUsers");

// Register route
router.post("/user/register", RegisterController.register);

// Login route
router.post("/user/login", LoginController.login);

// Logout route
router.post("/user/logout", LoginController.logout);

module.exports = router;
