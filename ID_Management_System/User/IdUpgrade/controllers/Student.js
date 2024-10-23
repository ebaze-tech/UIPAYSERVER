const StudentUpgrade = require("../models/Student");
const StudentRequest = require("../../Request/models/Request");
const { sequelize } = require("../../../DatabaseServer/db");

const StudentIdUpgrade = async (req, res) => {
  console.log("Request body: ", req.body);
  console.log("Request files: ", req.files);
  const { number } = req.body;
  const { reason } = req.body;
  const passport = req.files?.passport?.[0]?.path; // Getting passport file path
  const schoolSecurityReport = req.files?.passport?.[0]?.path; // Getting passport file path
  const affidavit = req.files?.passport?.[0]?.path; // Getting passport file path

  const { id } = req.params;

  try {
    const transaction = await sequelize.transaction();
    // Check if an upgrade already exists
    const existingUpgrade = await StudentUpgrade.findOne({
      where: { number },
      transaction,
    });
    if (existingUpgrade) {
      return res
        .status(404)
        .json({ message: "Student ID Card upgrade request already exists." });
    }

    // Create new Student ID upgrade request
    const newUpgrade = await StudentUpgrade.create(
      {
        number,
        passport,
        schoolSecurityReport,
        affidavit,
        reason,
      },
      { transaction }
    );
    await newUpgrade.save();

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
    await newRequest.save();
    res.status(201).json({
      message: "Student ID Card upgrade successful.",
      newRequest,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating staff application:", error.message);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = { StudentIdUpgrade };
