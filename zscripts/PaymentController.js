// controllers/PaymentController.js

const {
  generateRemitaPaymentUrl,
  verifyRemitaPayment,
} = require("../services/remitaPaymentService");

class PaymentController {
  static async initiatePayment(req, res) {
    const { amount, orderId, payerEmail, serviceTypeId } = req.body;

    try {
      const paymentUrl = await generateRemitaPaymentUrl(
        amount,
        orderId,
        payerEmail,
        serviceTypeId
      );
      res.status(200).json({ paymentUrl });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async verifyPayment(req, res) {
    const { orderId } = req.body;

    try {
      const isPaymentSuccessful = await verifyRemitaPayment(orderId);
      if (isPaymentSuccessful) {
        res.status(200).json({ message: "Payment verified successfully" });
      } else {
        res.status(400).json({ message: "Payment verification failed" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PaymentController;
