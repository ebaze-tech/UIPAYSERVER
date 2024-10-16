const express = require("express");
const router = express.Router();
const AdminController = require("../../controllers/admin/AdminController");
const AdminMiddleware = require("../../middleware/AdminAuth");

// Route protection by Admin middileware
// router.use(AdminMiddleware);

//Admin dashboard route
router.get("/dashboard", AdminMiddleware.isAdmin, AdminController.getDashboard);

// Routes to approve or reject a request
router.post(
  "/request/approve/:id",
  AdminMiddleware.isAdmin,
  AdminController.approveRequest
);
router.post(
  "/request/reject/:id",
  AdminMiddleware.isAdmin,
  AdminController.rejectRequest
);

module.exports = router;
