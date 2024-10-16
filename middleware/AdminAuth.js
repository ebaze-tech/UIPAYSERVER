const jwt = require("jsonwebtoken");
const AdminModel = require("../models/accounts/Admin");

class AuthMiddleware {
  static async isAdmin(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded token: ", decoded);

      // Fetch the user using the AdminModel
      const user = await AdminModel.findById(decoded._id);

      if (!user) {
        console.log("User not found or not an admin.");
        return res.status(403).json({ error: "Access denied" });
      }

      console.log("User found: ", user);
      // Attach the user to the request object
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: "Authentication required" });
    }
  }
}

module.exports = AuthMiddleware;
