const express = require("express");
const router = express.Router();
const Staff = require("../../controllers/application/Staff");
const { authenticate, authorize } = require("../../middleware/Auth");

router.post("/application/staff", authenticate, authorize("Staff"), Staff.apply);

module.exports = router;
