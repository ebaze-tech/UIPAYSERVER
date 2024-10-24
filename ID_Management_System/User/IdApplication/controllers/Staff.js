const StaffApplication = require("../../IdApplication/models/Staff");
const StaffRequest = require("../../Request/models/Request");
const { sequelize } = require("../../../DatabaseServer/db");

const StaffIdApplication = async (req, res) => {
  console.log("Request body: ", req.body);
  console.log("Request files: ", req.files);
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
    !designation ||
    !affidavit ||
    !schoolSecurityReport ||
    !passport
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

  const transaction = await sequelize.transaction();
  try {
    // Check if an application already exists
    let existingApplication = await StaffApplication.findOne({
      where: { number },
      transaction,
    });

    if (existingApplication) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Staff ID Card application already exists.",
      });
    }

    const newIdApplication = await StaffApplication.create(
      {
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
      },
      {
        transaction,
      }
    );

    const newRequest = await StaffRequest.create(
      {
        userId: number,
        status: "Pending",
        newIdApplication: newIdApplication.id,
        staffId: id,
        // type: "Application",
        userType: "Staff",
        requestType: "StaffApplication",
      },
      { transaction }
    );

    // Commit transaction
    await transaction.commit();

    res.status(201).json({
      message: "Staff ID Card application request successful.",
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

module.exports = { StaffIdApplication };
