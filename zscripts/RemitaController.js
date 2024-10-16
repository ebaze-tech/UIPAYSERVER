// controllers/PaymentController.js

const generateRemitaPaymentUrl = require("../../utils/generateRemitaPaymentUrl");

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
}

module.exports = PaymentController;
