const StudentUpgrade = require("../models/Student");
const StudentRequest = require("../../Request/models/Request");

const StudentIdUpgrade = async (req, res) => {
  const { number } = req.body;
  const { reason } = req.body;
  const passport = req.files?.passport?.[0]?.path; // Getting passport file path
  const schoolSecurityReport = req.files?.passport?.[0]?.path; // Getting passport file path
  const affidavit = req.files?.passport?.[0]?.path; // Getting passport file path

  const { id } = req.params;
  try {
    // Ensure both number and passport are provided
    if (
      !number ||
      !passport ||
      !schoolSecurityReport ||
      !affidavit ||
      !reason
    ) {
      return res.status(400).json({
        message: "Submit all required documents!",
      });
    }

    // Check if an upgrade already exists
    const existingUpgrade = await StudentUpgrade.findOne({
      where: { number },
    });
    if (existingUpgrade) {
      return res
        .status(404)
        .json({ message: "Student ID Card upgrade request already exists." });
    }

    // Create new Student ID upgrade request
    const newUpgrade = await StudentUpgrade.create({
      number,
      passport,
      schoolSecurityReport,
      affidavit,
      reason,
    });

    // Create request in Request table
    const newRequest = await StudentRequest.create({
      userId: number,
      status: "Pending",
      // type: "Upgrade",
      requestType: "StudentUpgrade",
      userType: "Student",
      studentId: id,
      newUpgrade,
    });

    res.status(201).json({
      message: "Student ID Card upgrade successful.",
      newRequest,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { StudentIdUpgrade };
