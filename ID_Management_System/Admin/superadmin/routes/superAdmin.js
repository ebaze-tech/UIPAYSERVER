const express = require("express");
const requestController = require("../controllers/superAdmin");
const { authenticate, authorize } = require("../../middlewares/Auth");
const router = express.Router();

// Route to approve or reject a request
router.put(
  "/requests/:id",
  authenticate,
  authorize("SuperAdmin"),
  requestController.updateRequestStatus
);

// Route to view all requests
router.get(
  "/requests",
  authenticate,
  authorize("SuperAdmin"),
  requestController.getAllRequests
);
// Route to view by id of userType
router.get(
  "/requests/:id",
  authenticate,
  authorize("SuperAdmin"),
  requestController.getRequestsById
);

// Route to view by userType(staff or student)
router.get(
  "/requests/:userType",
  authenticate,
  authorize("SuperAdmin"),
  requestController.getAllRequestsByUserType
);

// Route to view requests by userType(staff or student) and id of userType
router.get(
  "/requests/:userType/:id",
  authenticate,
  authorize("SuperAdmin"),
  requestController.getRequestByIdAndUserType
);

// Route to approve or reject the request by userType(staff or student) and id of userType
router.put(
  "/requests/:userType/:id",
  authenticate,
  authorize("SuperAdmin"),
  requestController.getRequestByIdAndUserType
);

// Route to view all approved requests
router.get(
  "/requests/approved",
  authenticate,
  authorize("SuperAdmin"),
  requestController.viewAllApprovedRequests
);
module.exports = router;
