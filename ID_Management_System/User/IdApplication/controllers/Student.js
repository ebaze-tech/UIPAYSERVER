const StudentApplication = require("../models/Student");
const StudentRequest = require("../../Request/models/Request");
const { sequelize } = require("../../../DatabaseServer/db"); // Assuming you're using Sequelize's transaction management

const StudentIdApplicationController = async (req, res) => {
  console.log("Request body: ", req.body);
  console.log("Request files: ", req.files);
  const { number, surname, otherNames, level, department, faculty, hall } =
    req.body;

  // Get file paths (if they exist)
  const affidavit = req.files?.affidavit?.[0]?.path;
  const schoolSecurityReport = req.files?.schoolSecurityReport?.[0]?.path;
  const passport = req.files?.passport?.[0]?.path;

  const { id } = req.params;

  // Validate input from request body
  if (
    !number ||
    !surname ||
    !otherNames ||
    !level ||
    !department ||
    !faculty ||
    !hall
  ) {
    return res.status(400).json({
      message: "Invalid input. Please fill in all required fields.",
    });
  }

  // Validate number format
  const numberRegex = /^\d{6}$/;
  if (!numberRegex.test(number)) {
    return res.status(400).json({
      message: "Wrong number format. Number must be 6 digits.",
    });
  }

  // Validate if all required files were uploaded
  if (!affidavit || !schoolSecurityReport || !passport) {
    return res.status(400).json({
      message:
        "Please upload all required documents: affidavit, school security report, and passport.",
    });
  }

  // Using transaction for better consistency
  const transaction = await sequelize.transaction();
  try {
    // Check if an application already exists
    const existingApplication = await StudentApplication.findOne({
      where: { number },
      transaction,
    });

    if (existingApplication) {
      await transaction.rollback(); // Rollback if there’s an error
      return res.status(400).json({
        message: "Student ID Card application already exists!",
      });
    }

    // Create new student application
    const newIdApplication = await StudentApplication.create(
      {
        number,
        surname,
        otherNames,
        department,
        faculty,
        level,
        hall,
        affidavit,
        schoolSecurityReport,
        passport,
      },
      { transaction }
    );
    await newIdApplication.save();

    // Create new request related to the application
    const newRequest = await StudentRequest.create(
      {
        userId: number,
        status: "Pending",
        newIdApplication: newIdApplication.id,
        studentId: id,
        userType: "Student",
        requestType: "StudentApplication",
      },
      { transaction }
    );
    await newRequest.save();

    // Commit transaction
    await transaction.commit();

    res.status(201).json({
      message: "Student ID Card application request successful.",
      newRequest,
    });
  } catch (error) {
    await transaction.rollback(); // Rollback transaction on error
    console.error("Error creating student application:", error.message);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = { StudentIdApplicationController };
