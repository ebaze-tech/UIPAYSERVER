const axios = require("axios");
const crypto = require("crypto");
const { header } = require("express-validator");

const generatePayment = async (req, res) => {
  try {
    const { amount, email } = req.body;

    // REMITA PAYMENT API URL
    const baseUrl = process.env.REMITA_BASE_URL;
    const merchantId = process.env.REMITA_MERCHANT_ID;
    const apiKey = process.env.REMITA_API_KEY;
    const secretKey = process.env.REMITA_SECRET_KEY;

    // Transaction ID nad hash generation for REMITA request
    const transactionId = `${merchantId}_${new Date().getTime()}`;
    const hash = crypto
      .createHash("sha512")
      .update(`${merchantId}${transactionId}${secretKey}`)
      .digest("hex");

    const payload = {
      amount,
      transactionId,
      email,
      merchantId,
      hash,
    };

    const response = await axios.post(`${baseUrl}/initiate-payment`, payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment initialization failed." });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const baseUrl = process.env.REMITA_BASE_URL;
    const apiKey = process.env.REMITA_API_KEY;

    const response = await axios.get(
      `${baseUrl}/verify-payment/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment verification failed." });
  }
};

module.exports = { generatePayment, verifyPayment };
