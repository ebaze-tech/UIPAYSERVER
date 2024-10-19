const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const StudentModel = require("../models/Student");
const StaffModel = require("../models/Staff");
require("dotenv").config();

const login = async (req, res) => {
  const { number, password } = req.body;

  if (!password || !number) {
    return res.status(400).json({
      error: "All fields are required.",
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
        error: "Invalid number format.",
      });
    }

    // Check if user exists
    const user = await UserModel.findByNumber(number);
    if (!user) {
      return res.status(400).json({
        error: `Invalid ${userType.toLowerCase()} number.`,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid password.",
      });
    }

    const token = jwt.sign({ userType, _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user.id,
        number: user.number,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
    res.status(200).json({ message: "Logout successful." });
  });
};

module.exports = { login, logout };
