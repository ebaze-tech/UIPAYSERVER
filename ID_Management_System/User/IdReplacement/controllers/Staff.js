const StaffReplacement = require("../models/Staff");
const StaffRequest = require("../../Request/models/Request");

const StaffIdReplacement = async (req, res) => {
  const { number } = req.body;
  const { reason } = req.body;
  const affidavit = req.files?.affidavit?.[0]?.path;
  const schoolSecurityReport = req.files?.schoolSecurityReport?.[0]?.path;
  const passport = req.files?.passport?.[0]?.path;

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
    const existingReplacement = await StaffReplacement.findOne({
      where: { number },
    });
    if (existingReplacement) {
      return res.status(404).json({
        message: "Staff ID Card replacement request already exists!",
      });
    }

    const newReplacement = await StaffReplacement.create({
      number,
      affidavit,
      schoolSecurityReport,
      passport,
      reason,
    });

    const newRequest = await StaffRequest.create({
      userId: number,
      status: "Pending",
      // type: "Replacement",
      requestType: "StaffReplacement",
      staffId: id,
      userType: "Staff",
      newReplacement,
    });

    res.status(201).json({
      message: "Staff ID Card replacement request successful.",
      newRequest,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { StaffIdReplacement };
