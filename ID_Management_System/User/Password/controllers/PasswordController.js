const bcrypt = require("bcryptjs");
const StaffModel = require("../../Accounts/models/Staff");
const StudentModel = require("../../Accounts/models/Student");
const PasswordResetToken = require("../models/PasswordReset");
const SendEmail = require("../../utils/SendEmail");
const { Op } = require("sequelize");

exports.forgotPassword = async (req, res) => {
  const { email, number } = req.body;

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

    const user = await UserModel.findByNumber(number);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Check if the number matches the user
    if (user.number !== number) {
      return res.status(400).json({
        message: "Number does not match our records.",
      });
    }

    // Generate OTP
    const OTP = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = Date.now() + 600000; // OTP expiration = 5 minutes
    // const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${OTP}&userType=${userType}`;

    const createdToken = await PasswordResetToken.create({
      number,
      userType,
      token: OTP,
      expiresAt,
      email,
    });
    console.log("Current time:", Date.now());
    console.log("Token expiry time:", PasswordResetToken.expiresAt);

    console.log("Token stored successfully:", createdToken);

    // Send OTP via email
    const subject = "Your OTP Code";
    const message = `Your OTP code to access your ${userType} portal is ${OTP}.`;
    await SendEmail(email, subject, message);

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { otp, number } = req.body;
  console.log("Received OTP:", otp, "Number:", number);
  console.log(
    "Looking for token:",
    otp,
    "for number:",
    number,
    "with expiration greater than:",
    Date.now()
  );

  try {
    // Find the token and its associated user
    const passwordResetToken = await PasswordResetToken.findOne({
      where: {
        token: otp,
        number,
        expiresAt: { [Op.gt]: Date.now() }, // Ensure token is not expired
      },
    });

    console.log("Query conditions:", {
      token: otp,
      number: number,
      expiresAt: { [Op.gt]: Date.now() },
    });

    console.log("Current time:", Date.now());
    console.log(
      "Token expiry time:",
      passwordResetToken ? passwordResetToken.expiresAt : "No token found"
    );

    if (!passwordResetToken) {
      console.error("No token found or token is expired:", otp);
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    console.log("Token retrieved successfully:", passwordResetToken);

    // Successfully verified, return the token and userType for further processing
    res.status(200).json({
      message: "OTP verified successfully",
      token: passwordResetToken.token,
      userType: passwordResetToken.userType,
    });

    // Optionally delete the token after verification
    // await PasswordResetToken.destroy({ where: { id: passwordResetToken.id } });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.resetPassword = async (req, res) => {
  const { number, newPassword } = req.body;
  const { token } = req.query;

  console.log("Received token: ", token);
  console.log("Received number: ", number);
  console.log("Received password: ", newPassword);

  try {
    if (!token) {
      console.error("Token is missing or undefined");
      return res.status(400).json({ message: "Token is required" });
    }

    console.log(
      "Checking for token:",
      token,
      "and number:",
      number,
      "with expiration greater than:",
      Date.now()
    );
    const passwordResetToken = await PasswordResetToken.findOne({
      where: {
        token: token,
        number,
        expiresAt: { [Op.gt]: Date.now() }, // Ensure token is not expired
      },
    });

    if (!passwordResetToken) {
      console.error("Invalid or expired token:", token);
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    console.log("Retrieved Token:", passwordResetToken);

    // Proceed with password reset logic
    let userType, UserModel;
    if (/^\d{6}$/.test(number)) {
      userType = "Student";
      UserModel = StudentModel;
    } else if (/^\d{4,5}$/.test(number)) {
      userType = "Staff";
      UserModel = StaffModel;
    } else {
      return res.status(400).json({
        message: "Invalid number format.",
      });
    }

    const user = await UserModel.findByNumber(number);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password and update user
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    // Delete token after successful password reset
    await PasswordResetToken.destroy({ where: { id: passwordResetToken.id } });

    res.status(200).json({
      message:
        "Password reset successful. Please log in with your new password.",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};
