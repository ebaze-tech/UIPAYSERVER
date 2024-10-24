const express = require("express");
const requestController = require("../controllers/superAdmin");
const { authenticate, authorize } = require("../../middlewares/Auth");
const router = express.Router();

router.get(
  "/requests",
  // authenticate,
  // authorize,
  requestController.getAllRequests
);
router.get(
  "/requests/:id",
  // authenticate,
  // authorize,
  requestController.getRequestsById
);
router.put(
  "/requests/:id",
  // authenticate,
  // authorize,
  requestController.updateRequestStatus
);

module.exports = router;
