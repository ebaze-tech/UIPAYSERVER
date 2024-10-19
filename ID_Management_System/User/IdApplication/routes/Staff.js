const express = require("express");
const router = express.Router();
const Staff = require("../controllers/Staff");
const { authenticate, authorize } = require("../../middleware/Auth");

router.post("/staff", authenticate, authorize("Staff"), Staff.StaffIdApplication);

module.exports = router;
