const StudentApplication = require("../models/Student");
const StudentRequest = require("../../Request/models/Request");

const StudentIdApplicationController = async (req, res) => {
  const { number, surname, otherNames, level, department, faculty, hall } =
    req.body;

  const affidavit = req.files?.affidavit?.[0]?.path;
  const schoolSecurityReport = req.files?.schoolSecurityReport?.[0]?.path;
  const passport = req.files?.passport?.[0]?.path;

  const { id } = req.params;

  //   Validate input from request body
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

  const numberRegex = /^\d{6}$/;

  // Validae number format
  if (!numberRegex.test(number)) {
    return res.status(400).json({
      message: "Wrong number format.",
    });
  }

  try {
    // Check if an application already exists
    let existingApplication = await StudentApplication.findOne({
      where: { number },
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "Student ID Card application already exists!",
      });
    }

    const newIdApplication = await StudentApplication.create({
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
    });

    const newRequest = await StudentRequest.create({
      userId: number,
      status: "Pending",
      newIdApplication: newIdApplication.id,
      studentId: id,
      // type: "Application",
      userType: "Student",
      requestType: "StudentApplication",
    });

    res.status(201).json({
      newRequest,
      message: "Student ID Card application request successful.",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = { StudentIdApplicationController };
