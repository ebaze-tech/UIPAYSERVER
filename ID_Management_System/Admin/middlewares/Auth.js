const jwt = require("jsonwebtoken");
const SuperAdminModel = require("../../Admin/accounts/models/superAdmin");
const ManufacturerModel = require("../../Admin/accounts/models/manufacturer");

module.exports = {
  authenticate: async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    console.log("Extracted token: ", token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token payload: ", decoded); // Log token payload

      const { _id: id, userType } = decoded;

      let UserModel;
      if (userType === "SuperAdmin") {
        UserModel = SuperAdminModel;
      } else if (userType === "Manufacturer") {
        UserModel = ManufacturerModel;
      } else {
        return res.status(401).json({ message: "Invalid user type" });
      }
      console.log("User ID: ", id);
      console.log("User Type: ", userType);

      console.log("Using UserModel:", UserModel); // Log UserModel to ensure it is not null

      if (!UserModel) {
        return res.status(401).json({ message: "User model not found" });
      }
      const user = await UserModel.findById(id); // Use findById to get user by ID
      console.log("Found User: ", user);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      req.userType = userType;
      return next();
    } catch (err) {
      console.error("JWT verification error:", err);
      return res
        .status(401)
        .json({ message: "Failed to authenticate token", err });
    }
  },

  authorize: (userType) => {
    return (req, res, next) => {
      console.log("Expected UserType:", userType);
      console.log("Actual UserType:", req.userType);
      if (req.userType !== userType) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      return next(); // Proceed to the next middleware or route handler
    };
  },
};
