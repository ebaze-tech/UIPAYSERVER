const jwt = require("jsonwebtoken");
const StaffUser = require("../models/accounts/Staff");
const StudentUser = require("../models/accounts/Staff");
require("dotenv").config();

console.log("JWT_SECRET: ", process.env.JWT_SECRET);

const PaymentAuth = async (req, res, next) => {
  try {
    const AuthHeader = req.header("Authorization");
    console.log("Auth Header: ", AuthHeader);

    if (!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authentication token is missing or malformed." });
    }
    const token = AuthHeader.replace("Bearer ", "");
    console.log("Token: ", token);

    if (!token) {
      return res.status(401).json({ error: "Token is missing." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token: ", decoded);

    const user =
      (await StaffUser.findById(decoded.userId)) ||
      (await StudentUser.findById(decoded.userId));
    console.log("User", user);

    if (!user) {
      res.status(401).json({ error: "User not found!" });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error: ", error)
    res.status(401).json({error: "Not authorized to access this resource."})
  }
};

module.exports = PaymentAuth