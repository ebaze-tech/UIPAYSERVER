const express = require("express");
const router = express.Router();
// const UserAuth = require("../../middleware/Auth");
const Student = require("../../controllers/application/Student");
const { authenticate, authorize } = require("../../middleware/Auth");

router.post(
  "/application/student",
  authenticate,
  authorize("Student"),
  Student.apply
);

module.exports = router;
