const bcrypt = require("bcryptjs");
const StudentModel = require("../models/Student");
const StaffModel = require("../models/Staff");

const register = async (req, res) => {
  const { number, email, password } = req.body;

  if (!number || !email || !password) {
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
    });

    res.status(201).json({
      newUser,
      message: `${userType} registered successfully.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { register };
