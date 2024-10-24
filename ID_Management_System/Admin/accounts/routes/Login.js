const express = require("express");
const router = express.Router();
const AdminLoginController = require("../controllers/Login");
// const { authorize, authenticate } = require("../../middlewares/Auth");

router.post("/login", AdminLoginController.login);
router.post("/logout", AdminLoginController.logout);

module.exports = router;
