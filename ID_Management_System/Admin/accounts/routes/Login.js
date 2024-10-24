const express = require("express");
const router = express.Router();
const AdminLoginController = require("../controllers/Login");
const { authorize, authenticate } = require("../../middlewares/Auth");

router.post("/login", authorize, authenticate, AdminLoginController.login);
router.post("/logout", authorize, authenticate, AdminLoginController.logout);

module.exports = router;
