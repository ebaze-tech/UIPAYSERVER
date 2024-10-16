const StaffModel = require("../../models/accounts/Staff");
const StudentModel = require("../../models/accounts/Student");
const Request = require("../../models/requests/Request");
const Payment = require("../../models/payment/payment");
const axios = require("axios");

// Create Request for either Staff or Student
const createRequest = async (req, res) => {
  const { userId, userType, requestType } = req.body; // 'userType' will be either 'Staff' or 'Student'

  try {
    // Validate if the user is a valid Staff or Student
    let user;
    if (userType === "Staff") {
      user = await StaffModel.findById(userId);
    } else if (userType === "Student") {
      user = await StudentModel.findById(userId);
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }

    if (!user) {
      return res.status(404).json({ message: `${userType} not found.` });
    }

    // Create the request
    const newRequest = await Request.create({
      userId, // Staff or Student's ID
      userType, // 'Staff' or 'Student'
      requestType, // Type of request (Replacement, Upgrade, etc.)
      status: "Pending",
    });

    // Generate REMITA payment URL
    const paymentUrl = await generateRemitaPayment(
      user,
      requestType,
      newRequest
    );

    res.status(201).json({ message: "Request created", paymentUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Generate REMITA Payment URL
const generateRemitaPayment = async (user, requestType) => {
  // Prepare user details (Staff or Student)
  const paymentDetails = {
    merchantId: process.env.REMITA_MERCHANT_ID,
    serviceTypeId: process.env.REMITA_SERVICE_TYPE_ID,
    orderId: `REQ_${new Date().getTime()}`,
    amount: 5000, // Sample amount, can be dynamic based on requestType
    payerName: user.otherNames + " " + user.surname, // Assuming 'otherNames' and 'surname' exist in both models
    payerEmail: user.email,
    payerPhone: "08012345678", // Replace with real user phone if available
  };

  // Call REMITA API to generate the payment URL
  const response = await axios.post(
    process.env.REMITA_BASE_URL,
    paymentDetails,
    {
      headers: { Authorization: `Bearer ${process.env.REMITA_API_KEY}` },
    }
  );

  return response.data.paymentUrl; // REMITA Payment URL
};

module.exports = { createRequest };
