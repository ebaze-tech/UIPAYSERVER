// view all requests
// view new requests by id
const requestModel = require("../../../User/Request/models/Request");

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await requestModel.findAll({
      where: { status: "Pending" },
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Get a specific request by ID
exports.getRequestsById = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await requestModel.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error:", error: error.message });
  }
};

// Approve or reject a request
exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const request = await requestModel.findByPk(id);
    if (request) {
      request.status = status;
      await request.save();
      res
        .status(201)
        .json({ message: "Request updated successfully", request });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error });
  }
};
