const express = require("express");
const requestController = require("../controllers/superAdmin");
const { authenticate, authorize } = require("../../middlewares/Auth");
const router = express.Router();

// Route to approve or reject a request by id
router.put(
  "/update/requests/:id",
  authenticate,
  authorize("SuperAdmin"),
  requestController.updateRequestStatus
);

// Route to approve or reject the request by userType(staff or student) and id of userType
router.put(
  "/update/requests/:userType/:id",
  authenticate,
  authorize("SuperAdmin"),
  requestController.getRequestByIdAndUserType
);

// Route to view all requests
router.get(
  "/view/requests",
  authenticate,
  authorize("SuperAdmin"),
  requestController.getAllRequests
);

// Route to view all approved requests
router.get(
  "/view/requests/approved",
  authenticate,
  authorize("SuperAdmin"),
  requestController.viewAllApprovedRequests
);

// Route to view by id of userType
router.get(
  "/view/requests/id/:id",
  authenticate,
  authorize("SuperAdmin"),
  requestController.getRequestsById
);

// Route to view by userType(staff or student)
router.get(
  "/view/requests/userType/:userType",
  authenticate,
  authorize("SuperAdmin"),
  requestController.getAllRequestsByUserType
);

// Route to view requests by userType(staff or student) and id of userType
router.get(
  "/view/requests/userType&id/:userType/:id",
  authenticate,
  authorize("SuperAdmin"),
  requestController.getRequestByIdAndUserType
);

module.exports = router;
