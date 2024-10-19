const StaffApplication = require("../../IdApplication/models/Staff");
const StaffRequest = require("../../Request/models/Request");

const StaffIdApplication = async (req, res) => {
  const {
    number,
    surname,
    otherNames,
    position,
    department,
    faculty,
    designation,
  } = req.body;

  const affidavit = req.files?.affidavit?.[0]?.path;
  const schoolSecurityReport = req.files?.schoolSecurityReport?.[0]?.path;
  const passport = req.files?.passport?.[0]?.path;

  const { id } = req.params;

  // Validate input from request body
  if (
    !number ||
    !surname ||
    !otherNames ||
    !position ||
    !department ||
    !faculty ||
    !designation
  ) {
    return res.status(400).json({
      message: "Invalid input. Please fill in all required fields.",
    });
  }

  const numberRegex = /^\d{4,5}$/;

  // Validate number format
  if (!numberRegex.test(number)) {
    return res.status(400).json({
      message: "Wrong number format.",
    });
  }

  try {
    // Check if an application already exists
    let existingApplicaation = await StaffApplication.findOne({
      where: { number },
    });
    if (existingApplicaation) {
      return res.status(400).json({
        message: "Staff ID Card application already exists.",
      });
    }

    const newIdApplication = await StaffApplication.create({
      number,
      surname,
      otherNames,
      position,
      department,
      faculty,
      designation,
      affidavit,
      schoolSecurityReport,
      passport,
    });

    const newRequest = await StaffRequest.create({
      userId: number,
      status: "Pending",
      newIdApplication: newIdApplication.id,
      staffId: id,
      // type: "Application",
      userType: "Staff",
      requestType: "StaffApplication",
    });

    res.status(201).json({
      message: "Staff ID Card application request successful.",
      newRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports = { StaffIdApplication };
