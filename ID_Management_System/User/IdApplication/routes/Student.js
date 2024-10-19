const express = require("express");
const router = express.Router();
const Student = require("../controllers/Student");
const { authenticate, authorize } = require("../../middleware/Auth");

router.post("/student", authenticate, authorize("Student"), Student.StudentIdApplicationController);

module.exports = router;
