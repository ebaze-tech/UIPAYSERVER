const bcrypt = require("bcryptjs");
const StudentModel = require("../models/Student");
const StaffModel = require("../models/Staff");

const register = async (req, res) => {
  const {
    number,
    email,
    password,
    surname,
    otherNames,
    department,
    faculty,
    hall,
  } = req.body;

  if (
    !number ||
    !email ||
    !password ||
    !surname ||
    !otherNames ||
    !department ||
    !faculty ||
    !hall
  ) {
    return res.status(400).json({
      message: "Input cannot be empty",
    });
  }

  try {
    let userType, UserModel;
    if (/^\d{6}$/.test(number)) {
      // It's a student
      userType = "Student";
      UserModel = StudentModel;
    } else if (/^\d{4,5}$/.test(number)) {
      // It's a staff
      userType = "Staff";
      UserModel = StaffModel;
    } else {
      return res.status(400).json({
        message: "Invalid number format.",
      });
    }

    // Check if user already exists
    let user;
    if ((user = await UserModel.findByNumber(number))) {
      return res.status(400).json({
        message: `${userType} with this number already exists.`,
      });
    } else if ((user = await UserModel.findByEmail(email))) {
      return res.status(400).json({
        message: `${userType} with this email already exists.`,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      number,
      surname,
      otherNames,
      department,
      faculty,
      hall,
    });

    // Get a plain object representation and exclude password
    const userWithoutPassword = newUser.get({ plain: true });
    delete userWithoutPassword.password; // Exclude the password field

    res.status(201).json({
      user: userWithoutPassword,
      message: `${userType} registered successfully.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = { register };
