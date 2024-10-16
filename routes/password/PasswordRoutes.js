const express = require("express");
const {
  forgotPassword,
  resetPassword,
  verifyOTP,
} = require("../../controllers/password/PasswordController");
const router = express.Router();

router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);
router.post("/otp/verify", verifyOTP);

module.exports = router;
