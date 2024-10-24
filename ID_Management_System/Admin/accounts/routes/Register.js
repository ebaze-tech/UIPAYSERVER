const express = require("express");
const router = express.Router();
const AdminRegisterController = require("../controllers/Register");
const { authorize, authenticate } = require("../../middlewares/Auth");

router.post(
  "/register",
  authorize,
  authenticate,
  AdminRegisterController.register
);

module.exports = router;
