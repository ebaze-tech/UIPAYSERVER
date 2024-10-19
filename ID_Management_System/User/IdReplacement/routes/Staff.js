const express = require("express");
const router = express.Router();
const StaffReplacementController = require("../controllers/Staff");
const { authenticate, authorize } = require("../../middleware/Auth");
const { replacementValidation } = require("../../middleware/Validation");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Files of this type are not allowed!");
    }
  },
});

// Staff Replacement Routes
router.post(
  "/staff",
  replacementValidation,
  upload.fields([
    { name: "affidavit", maxCount: 1 },
    { name: "schoolSecurityReport", maxCount: 1 },
    { name: "passport", maxCount: 1 },
  ]),
  authenticate,
  authorize("Staff"),
  StaffReplacementController.StaffIdReplacement
);

module.exports = router;
