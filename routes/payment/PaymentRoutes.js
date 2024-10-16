const express = require("express");
const router = express.Router();
const {
  generatePayment,
  verifyPayment,
} = require("../../controllers/payment/PaymentController");

router.post("/payment/initiate", generatePayment);
router.post("/payment/verify", verifyPayment);

module.exports = router;
