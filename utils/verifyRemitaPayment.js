// services/remitaPaymentService.js

const axios = require("axios");
const remitaConfig = require("../config/remita-config");
const crypto = require("crypto");

async function verifyRemitaPayment(orderId) {
  const hash = crypto
    .createHash("sha512")
    .update(orderId + remitaConfig.apiKey + remitaConfig.apiKey)
    .digest("hex");

  const url = `${remitaConfig.apiEndpoint}/orderstatus?orderId=${orderId}&hash=${hash}`;

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
