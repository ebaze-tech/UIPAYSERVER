// services/remitaPaymentService.js

const axios = require("axios");
const remitaConfig = require("../config/remita-config");
const crypto = require("crypto");

async function generateRemitaPaymentUrl(
  amount,
  orderId,
  payerEmail,
  serviceTypeId
) {
  const hash = crypto
    .createHash("sha512")
    .update(
      remitaConfig.merchantId +
        remitaConfig.apiKey +
        orderId +
        amount +
        remitaConfig.apiKey
    )
    .digest("hex");

  const payload = {
    serviceTypeId,
    orderId,
    totalAmount: amount,
    payerName: payerEmail,
    payerEmail,
    payerPhone: "08012345678", // Dummy phone number, replace with actual
    description: "ID Card Payment",
    hash,
  };

  try {
    const response = await axios.post(remitaConfig.apiEndpoint, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.statuscode === "025") {
      return response.data.paymenturl; // URL where user can make the payment
    } else {
      throw new Error(response.data.status);
    }
  } catch (error) {
    console.error("Error generating payment URL:", error);
    throw new Error("Failed to generate payment URL");
  }
}

async function verifyRemitaPayment(orderId) {
  const hash = crypto
    .createHash("sha512")
    .update(orderId + remitaConfig.apiKey + remitaConfig.apiKey)
    .digest("hex");

  const url = `${remitaConfig.paymentEndpoint}/orderstatus?orderId=${orderId}&hash=${hash}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.status === "00") {
      return true; // Payment successful
    } else {
      return false; // Payment not successful
    }
  } catch (error) {
    console.error("Error verifying payment status:", error);
    throw new Error("Failed to verify payment status");
  }
}

module.exports = { generateRemitaPaymentUrl, verifyRemitaPayment };
