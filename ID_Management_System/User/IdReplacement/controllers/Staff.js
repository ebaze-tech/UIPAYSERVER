const StaffReplacement = require("../models/Staff");
const StaffRequest = require("../../Request/models/Request");
const { sequelize } = require("../../../DatabaseServer/db");

const StaffIdReplacement = async (req, res) => {
  console.log("Request body: ", req.body);
  console.log("Request files: ", req.files);
  const { number } = req.body;
  const { reason } = req.body;
  const affidavit = req.files?.affidavit?.[0]?.path;
  const schoolSecurityReport = req.files?.schoolSecurityReport?.[0]?.path;
  const passport = req.files?.passport?.[0]?.path;

  const { id } = req.params;

  if (!number || !affidavit || !schoolSecurityReport || !passport || !reason) {
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

  const transaction = await sequelize.transaction();

  try {
    // Check if a replacement request already exists
    const existingReplacement = await StaffReplacement.findOne({
      where: { number },
      transaction,
    });
    if (existingReplacement) {
      await transaction.rollback();
      return res.status(404).json({
        message: "Staff ID Card replacement request already exists!",
      });
    }

    const newReplacement = await StaffReplacement.create(
      {
        number,
        affidavit,
        schoolSecurityReport,
        passport,
        reason,
      },
      { transaction }
    );

    const newRequest = await StaffRequest.create({
      userId: number,
      status: "Pending",
      requestType: "Staff ID Card Replacement",
      staffId: id,
      userType: "Staff",
      newReplacement,
      affidavit,
      schoolSecurityReport,
      passport,
    });

    await transaction.commit();

    res.status(201).json({
      message: "Staff ID Card replacement request successful.",
      newRequest,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating staff replacement request:", error.message);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = { StaffIdReplacement };
