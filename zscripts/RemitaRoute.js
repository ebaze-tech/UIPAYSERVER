// routes/paymentRoutes.js

const express = require("express");
const PaymentController = require("../controllers/payment/RemitaController");
const router = express.Router();
const PaymentAuth = require("../middleware/Payment");

router.post("/initiate", PaymentAuth, PaymentController.initiatePayment);

module.exports = router;
