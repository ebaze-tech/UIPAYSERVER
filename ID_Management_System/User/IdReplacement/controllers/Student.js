const StudentReplacement = require("../models/Student");
const StudentRequest = require("../../Request/models/Request");

const StudentIdReplacement = async (req, res) => {
  const { number } = req.body;
  const { reason } = req.body;
  const affidavit = req.files?.affidavit?.[0]?.path; // Getting affidavit file path
  const schoolSecurityReport = req.files?.schoolSecurityReport?.[0]?.path; // Getting security report file path
  const passport = req.files?.passport?.[0]?.path; // Getting passport file path

  const { id } = req.params;
  try {
    if (
      !number ||
      !affidavit ||
      !schoolSecurityReport ||
      !passport ||
      !reason
    ) {
      return res.status(400).json({
        message: "Submit all required documents!",
      });
    }

    // Check if a replacement request already exists
    const existingReplacement = await StudentReplacement.findOne({
      where: { number },
    });
    if (existingReplacement) {
      return res.status(404).json({
        message: "Student ID Card replacement request already exists!",
      });
    }

    // Create new Student ID replacement request
    const newReplacement = await StudentReplacement.create({
      number,
      affidavit,
      schoolSecurityReport,
      passport,
      reason,
    });

    // Create request in Request table
    const newRequest = await StudentRequest.create({
      userId: number,
      status: "Pending",
      // type: "Replacement",
      requestType: "StudentReplacement",
      userType: "Student",
      studentId: id,
      newReplacement,
    });

    res.status(201).json({
      message: "Student ID Card replacement request successful.",
      newRequest,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { StudentIdReplacement };
