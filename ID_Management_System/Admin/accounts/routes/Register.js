const express = require("express");
const router = express.Router();
const AdminRegisterController = require("../controllers/Register");

router.post("/register", AdminRegisterController.register);

module.exports = router;
