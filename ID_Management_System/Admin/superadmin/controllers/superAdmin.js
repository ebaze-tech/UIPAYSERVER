// view all requests
// view new requests by id
const requestModel = require("../../../User/Request/models/Request");

// Approve or reject a request
exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const request = await requestModel.findByPk(id);
    if (!request || request.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }

    request.status = status;
    await request.save();

    res.status(200).json({ message: "Request updated successfully", request });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating request", error: error.message });
  }
};

exports.updateRequestStatusByUserType = async (req, res) => {
  const { id } = req.params;
  const { status, userType } = req.body; // get userType from body
  try {
    const request = await requestModel.findOne({
      where: {
        id,
        userType, // Filter by userType
      },
    });
    if (request) {
      request.status = status;
      await request.save();
      res
        .status(201)
        .json({ message: "Request updated successfully", request });
    } else {
      return res.status(404).json({
        message:
          "Request not found or doesn't belong to the specified user type.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error });
  }
};

exports.viewAllRequests = async (req, res) => {
  try {
    const requests = await requestModel.findAll();
    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.viewAllApprovedRequests = async (req, res) => {
  try {
    const requests = await requestModel.findAll({
      where: { status: "Approved" },
    });
    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.viewAllPendingRequests = async (req, res) => {
  try {
    const requests = await requestModel.findAll({
      where: { status: "Pending" },
    });
    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Get a specific request by ID
exports.viewRequestsById = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await requestModel.findByPk(id);
    if (!request || request.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }
    res.status(200).json(request); // Return the found request
  } catch (error) {
    res.status(500).json({ message: "Server error:", error: error.message });
  }
};

exports.viewAllRequestsByUserType = async (req, res) => {
  const { userType } = req.params;
  try {
    const requests = await requestModel.findAll({
      where: {
        status: "Pending",
        userType,
      },
    });
    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.viewRequestByIdAndUserType = async (req, res) => {
  const { id, userType } = req.params;
  try {
    const request = await requestModel.findOne({
      where: {
        id,
        userType,
      },
    });
    if (!request || request.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Server error:", error: error.message });
  }
};
