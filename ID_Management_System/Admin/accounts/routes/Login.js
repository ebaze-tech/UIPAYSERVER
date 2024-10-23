const express = require("express");
const router = express.Router();
const AdminLoginController = require("../controllers/Login");

router.post("/login", AdminLoginController.login);
router.post("/logout", AdminLoginController.logout);

module.exports = router;
