const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel = require("../../models/accounts/Admin");

class AdminController {
  static async register(req, res) {
    const { email, password, number } = req.body;

    if (!email || !password || !number) {
      return res.status(400).json({
        meesage: "Input cannot be empty",
      });
    }
    try {
      // Validate the number length
      const numberRegex = /^\d{8}$/;
      if (!numberRegex.test(number)) {
        return res.status(400).json({
          message: "Wrong number input. Must be 8 digits long.",
        });
      }

      // Check if user already exists
      let user = await AdminModel.findByNumber(number);
      if (user) {
        return res.status(400).json({
          message: "Admin with this number already exists.",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await AdminModel.create({
        email,
        password: hashedPassword,
        number,
      });

      res.status(201).json({
        newUser,
        message: "Admin registered successfully.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err.message,
      });
    }
  }

  static async login(req, res) {
    const { number, password } = req.body;

    if (!password || !number) {
      return res.status(400).json({
        meesage: "All fields are required.",
      });
    }
    try {
      // Check if user exists
      const user = await AdminModel.findByNumber(number);
      if (!user) {
        return res.status(400).json({
          message: "Invalid admin number.",
        });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid password.",
        });
      }

      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
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
  }

  static logout(req, res) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }
      res.status(200).json({ message: "Logout successful." });
    });
  }
}

module.exports = AdminController;
