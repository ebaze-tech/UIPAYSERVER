const StudentReplacement = require("../models/Student");
const StudentRequest = require("../../Request/models/Request");
const { sequelize } = require("../../../DatabaseServer/db");

const StudentIdReplacement = async (req, res) => {
  console.log("Request body: ", req.body);
  console.log("Request files: ", req.files);
  const { number } = req.body;
  const { reason } = req.body;
  const affidavit = req.files?.affidavit?.[0]?.path; // Getting affidavit file path
  const schoolSecurityReport = req.files?.schoolSecurityReport?.[0]?.path; // Getting security report file path
  const passport = req.files?.passport?.[0]?.path; // Getting passport file path

  const { id } = req.params;

  if (!number || !affidavit || !schoolSecurityReport || !passport || !reason) {
    return res.status(400).json({
      message: "Submit all required documents!",
    });
  }

  const numberRegex = /^\d{6}$/;

  // Validate number format
  if (!numberRegex.test(number)) {
    return res.status(400).json({
      message: "Wrong number format.",
    });
  }
  // Validate if all required files were uploaded
  if (!affidavit || !schoolSecurityReport || !passport) {
    return res.status(400).json({
      message:
        "Please upload all required documents: affidavit, school security report, and passport.",
    });
  }

  const transaction = await sequelize.transaction();
  try {
    // Check if a replacement request already exists
    const existingReplacement = await StudentReplacement.findOne({
      where: { number },
      transaction,
    });
    if (existingReplacement) {
      await transaction.rollback();
      return res.status(404).json({
        message: "Student ID Card replacement request already exists!",
      });
    }

    // Create new Student ID replacement request
    const newReplacement = await StudentReplacement.create(
      {
        number,
        affidavit,
        schoolSecurityReport,
        passport,
        reason,
      },
      { transaction }
    );
    await newReplacement.save();

    // Create request in Request table
    const newRequest = await StudentRequest.create(
      {
        userId: number,
        status: "Pending",
        // type: "Replacement",
        requestType: "StudentReplacement",
        userType: "Student",
        studentId: id,
        newReplacement,
      },
      {
        transaction,
      }
    );
    await newRequest.save();

    await transaction.commit();

    res.status(201).json({
      message: "Student ID Card replacement request successful.",
      newRequest,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating student replacement request:", error.message);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = { StudentIdReplacement };
