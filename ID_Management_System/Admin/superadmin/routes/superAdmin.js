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
  requestController.viewRequestByIdAndUserType
);

// Route to view all requests
router.get(
  "/view/requests/all",
  authenticate,
  authorize("SuperAdmin"),
  requestController.viewAllRequests
);

// Route to view all pending requests
router.get(
  "/view/requests/pending",
  authenticate,
  authorize("SuperAdmin"),
  requestController.viewAllPendingRequests
);

// Route to view all approved requests
router.get(
  "/view/requests/approved",
  authenticate,
  authorize("SuperAdmin"),
  requestController.viewAllApprovedRequests
);
// Route to view all rejected requests
router.get("/view/requests/rejected", authenticate, authorize("SuperAdmin"),requestController.viewAllRejectedRequests);

// Route to view by id of userType
router.get(
  "/view/requests/id/:id",
  authenticate,
  authorize("SuperAdmin"),
  requestController.viewRequestsById
);

// Route to view by userType(staff or student)
router.get(
  "/view/requests/userType/:userType",
  authenticate,
  authorize("SuperAdmin"),
  requestController.viewAllRequestsByUserType
);

// Route to view requests by userType(staff or student) and id of userType
router.get(
  "/view/requests/userType&id/:userType/:id",
  authenticate,
  authorize("SuperAdmin"),
  requestController.viewRequestByIdAndUserType
);

// Route to get daily requests
router.get(
  "/view/requests/today",
  authenticate,
  authorize("SuperAdmin"),
  requestController.getDailyRequests
);

// Route to get everyday requests
router.get(
  "/view/requests/daily",
  authenticate,
  authorize("SuperAdmin"),
  requestController.requestsPerDay
);

// Route to get total cards produced
router.get(
  "/view/totalcards",
  authenticate,
  authorize("SuperAdmin"),
  requestController.viewTotalCards
);
// Route to get total cards produced per week
router.get(
  "/view/totalcards/weekly",
  authenticate,
  authorize("SuperAdmin"),
  requestController.totalCardsProducedWeekly
);

router.get(
  "/view/totalcards/average",
  authenticate,
  authorize("SuperAdmin"),
  requestController.averageCardProducedWeekly
);

module.exports = router;
