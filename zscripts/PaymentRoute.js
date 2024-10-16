// routes/paymentRoutes.js

const express = require("express");
const PaymentController = require("../controllers/payment/PaymentController");
const router = express.Router();
const PaymentAuth = require("../middleware/Payment");

router.post("/verify", PaymentAuth, PaymentController.verifyPayment);
router.post("/initiate", PaymentAuth, PaymentController.initiatePayment);

module.exports = router;
