const bcrypt = require("bcryptjs");
const SuperAdminModel = require("../models/superAdmin");
const Manufacturer = require("../models/manufacturer");

const register = async (req, res) => {
  const { number, email, password } = req.body;

  if (!number || !email || !password) {
    return res.status(400).json({
      message: "Input cannot be empty",
    });
  }

  try {
    let userType, UserModel;
    if (/^\d{8}$/.test(number)) {
      userType = "SuperAdmin";
      UserModel = SuperAdminModel;
      // return;
    } else if (/^\d{7}$/.test(number)) {
      userType = "Manufacturer";
      UserModel = Manufacturer;
      // return;
    } else {
      return res.status(400).json({
        error: "Invalid number format.",
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
