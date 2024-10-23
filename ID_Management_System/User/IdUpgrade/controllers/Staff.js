const StaffUpgrade = require("../models/Staff");
const StaffRequest = require("../../Request/models/Request");
const { sequelize } = require("../../../DatabaseServer/db");

const StaffIdUpgrade = async (req, res) => {
  console.log("Request body: ", req.body);
  console.log("Request files: ", req.files);
  const { number } = req.body;
  const { reason } = req.body;
  const passport = req.files?.passport?.[0]?.path; // Getting passport file path
  const schoolSecurityReport = req.files?.passport?.[0]?.path; // Getting securtiy report file path
  const affidavit = req.files?.passport?.[0]?.path; // Getting affidavti file path
  const { id } = req.params;

  if (!number || !passport || !schoolSecurityReport || !affidavit || !reason) {
    return res.status(400).json({
      message: "Submit all required documents!",
    });
  }

  const numberRegex = /^\d{4,5}$/;

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
    // Check if an upgrade request already exists
    const existingUpgrade = await StaffUpgrade.findOne({
      where: { number },
      transaction,
    });
    if (existingUpgrade) {
      return res
        .status(404)
        .json({ message: "Staff ID Card upgrade request already exists." });
    }

    const newUpgrade = await StaffUpgrade.create(
      {
        number,
        passport,
        affidavit,
        schoolSecurityReport,
        reason,
      },
      { transaction }
    );
    await newUpgrade.save();

    // Create request in Request table
    const newRequest = await StaffRequest.create({
      userId: number,
      status: "Pending",
      // type: "Upgrade",
      requestType: "StaffUpgrade",
      userType: "Staff",
      staffId: id,
      newUpgrade,
    });
    await newRequest.save();

    res.status(201).json({
      message: "Staff ID Card upgrade successful.",
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

module.exports = { StaffIdUpgrade };
