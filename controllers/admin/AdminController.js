const sequelize = require("../../config/database");
const models = require("../../config/model.init");

const getDashboard = async (req, res) => {
  try {
    // Ensure models are loaded correctly
    console.log({ "Found model ": models }); // This should print the available models, including Request

    // Fetch pending requests using raw query
    const [results, metadata] = await sequelize.query(`
      SELECT * FROM Requests 
      WHERE status = 'Pending'
    `);

    console.log(results); // This will contain the list of pending requests

    // Render the results in the view
    res.json({ results }); // Pass `results` to the view as `requests`
  } catch (error) {
    console.error("Error fetching requests: ", error);
    res.status(500).send("Server Error.");
  }
};

const approveRequest = async (req, res) => {
  try {
    const { type, id } = req.params;

    const RequestModel = type === "staff" ? StaffRequest : StudentRequest;

    const request = await RequestModel.findByPk(id, {
      include: [Payment],
    });

    if (
      request &&
      request.Payment.status === "Success" &&
      isValidDocuments(request.documents)
    ) {
      request.status = "Approved";
      await request.save();
      res.redirect("/admin/dashboard");
    } else {
      res
        .status(400)
        .send("Cannot approve request: Invalid payment or documents.");
    }
  } catch (error) {
    res.status(500).send("Server Error.");
  }
};

const rejectRequest = async (req, res) => {
  try {
    const { type, id } = req.params;

    const RequestModel = type === "Staff" ? StaffRequest : StudentRequest;

    const request = await RequestModel.findByPk(id);

    if (request) {
      request.status = "Rejected";
      await request.save();
      res.redirect("/admin/dashboard");
    } else {
      res.status(404).send("Request not found.");
    }
  } catch (error) {
    res.status(500).send("Server Error.");
  }
};

// Document validation function
const isValidDocuments = (documents) => {
  if (!documents || typeof documents !== "object") {
    return false;
  }

  const requiredFields = ["idProof", "addressProof"];

  for (const field of requiredFields) {
    if (!documents[field] || !isValidFileType(documents[field])) {
      return false;
    }
  }

  return true;
};

const isValidFileType = (filePath) => {
  const allowedExtensions = [".pdf", ".jpeg", ".jpg", ".png"];
  const ext = path.extname(filePath).toLowerCase();
  return allowedExtensions.includes(ext);
};

const verifyPayment = async (req, res) => {
  const { requestId } = req.params;
  try {
    const request = await Request.findByPk(requestId);

    // API Call to REMITA to verify payment status
    const paymentStatus = await getRemitaPaymentStatus(request.paymentId);
    if (paymentStatus === "SUCCESSFUL") {
      request.status = "Approved";
      await request.save();

      res
        .status(200)
        .json({ message: "Payment verified and request approved." });
    } else {
      res.status(400).json({ message: "Payment not successful." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getRemitaPaymentStatus = async (paymentId) => {
  const response = await axios.get(
    `${process.env.REMITA_BASE_URL}/status/${paymentId}`,
    {
      headers: { Authorization: `Bearer ${process.env.REMITA_API_KEY}` },
    }
  );

  return response.data.status; // e.g., 'SUCCESSFUL'
};

const sendManufacturerNotification = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await Request.findByPk(requestId);

    // Notify manufacturer via email and in-app message
    const manufacturerEmail = "manufacturer@example.com";
    const message = `User with ID ${request.userId} has paid for ID card.`;

    // Send email (using a service like Nodemailer)
    await sendEmail(manufacturerEmail, "New ID Card Request", message);

    // Create in-app notification
    await Notification.create({
      recipient: "manufacturer",
      message,
    });

    res.status(200).json({ message: "Notification sent to manufacturer." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const sendEmail = async (to, subject, message) => {
  // Implement email sending with Nodemailer or similar
};

module.exports = {
  rejectRequest,
  approveRequest,
  getDashboard,
  verifyPayment,
  sendManufacturerNotification,
};
