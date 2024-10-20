const StaffUpgrade = require("../models/Staff");
const StaffRequest = require("../../Request/models/Request");

const StaffIdUpgrade = async (req, res) => {
  const { number } = req.body;
  const { reason } = req.body;
  const passport = req.files?.passport?.[0]?.path; // Getting passport file path
  const schoolSecurityReport = req.files?.passport?.[0]?.path; // Getting securtiy report file path
  const affidavit = req.files?.passport?.[0]?.path; // Getting affidavti file path

  const { id } = req.params
  try {
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

    // Check if an upgrade request already exists
    const existingUpgrade = await StaffUpgrade.findOne({ where: { number } });
    if (existingUpgrade) {
      return res
        .status(404)
        .json({ message: "Staff ID Card upgrade request already exists." });
    }

    const newUpgrade = await StaffUpgrade.create({
      number,
      passport,
      affidavit,
      schoolSecurityReport,
      reason,
    });

    // Create requesst in Request table
    const newRequest = await StaffRequest.create({
      userId: number,
      status: "Pending",
      // type: "Upgrade",
      requestType: "StaffUpgrade",
      userType: "Staff",
      staffId: id,
      newUpgrade,
    });

    res.status(201).json({
      message: "Staff ID Card upgrade successful.",
      newRequest,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { StaffIdUpgrade };
