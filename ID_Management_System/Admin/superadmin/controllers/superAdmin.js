// view all requests
// view new requests by id
const requestModel = require("../../../User/Request/models/Request");
const { sequelize } = require("../../../DatabaseServer/db");
const { Op, fn, col } = require("sequelize");

const formatDateInGMTPlus1 = (date) => {
  const gmtOffset = 1 * 60 * 60 * 1000; // GMT+1 in milliseconds
  const gmtDate = new Date(date.getTime() + gmtOffset);
  return gmtDate.toISOString().slice(0, 19).replace("T", " "); // Format as "YYYY-MM-DD HH:MM:SS"
};

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

// Retrieve today's requests
exports.getDailyRequests = async (req, res) => {
  try {
    const { start, end } = getTodayRange();

    const dailyRequests = await requestModel.findAll({
      where: {
        createdAt: {
          [Op.between]: [start, end],
        },
      },
      order: [["createdAt", "ASC"]],
    });

    if (!dailyRequests || dailyRequests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }

    const formattedRequests = dailyRequests.map((request) => ({
      ...request.toJSON(),
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    }));

    res.json(formattedRequests);
  } catch (error) {
    console.error("Error fetching daily requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieve request made each day
exports.requestsPerDay = async (req, res) => {
  try {
    const requestsPerDay = await requestModel.findAll({
      order: [["createdAt", "ASC"]],
    });

    const formattedRequests = requestsPerDay.map((request) => ({
      ...request.toJSON(),
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    }));

    res.json(formattedRequests);
  } catch (error) {
    console.error("Error fetching requests grouped by day:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Approve or reject a request
exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const request = await requestModel.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    request.status = status;
    await request.save();

    const formattedRequest = {
      ...request.toJSON(),
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    };

    res.status(200).json({
      message: "Request updated successfully",
      request: formattedRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating request", error: error.message });
  }
};

// Update request by userType
exports.updateRequestStatusByUserType = async (req, res) => {
  const { id } = req.params;
  const { status, userType } = req.body;
  try {
    const request = await requestModel.findOne({
      where: {
        id,
        userType,
      },
    });

    if (!request) {
      return res.status(404).json({
        message:
          "Request not found or doesn't belong to the specified user type.",
      });
    }

    request.status = status;
    await request.save();

    const formattedRequest = {
      ...request.toJSON(),
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    };

    res.status(201).json({
      message: "Request updated successfully",
      request: formattedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error });
  }
};

// View all requests
exports.viewAllRequests = async (req, res) => {
  try {
    const requests = await requestModel.findAll({
      order: [["createdAt", "ASC"]],
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }

    const formattedRequests = requests.map((request) => ({
      ...request.toJSON(),
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// View total cards produced
exports.viewTotalCards = async (req, res) => {
  try {
    const totalCardsProduced = await requestModel.count({
      where: {
        status: "Produced",
      },
    });

    res.json({ totalCardsProduced });
  } catch (error) {
    console.error("Error fetching total ID cards produced:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Total cards produced per week
exports.totalCardsProducedWeekly = async (req, res) => {
  try {
    const results = await requestModel.findAll({
      attributes: [
        [sequelize.fn("YEARWEEK", sequelize.col("createdAt")), "week"],
        [sequelize.fn("COUNT", sequelize.col("id")), "totalProduced"],
      ],
      where: {
        status: "Produced",
      },
      group: [sequelize.fn("YEARWEEK", sequelize.col("createdAt"))],
      order: [[sequelize.fn("YEARWEEK", sequelize.col("createdAt")), "ASC"]],
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching total ID cards produced per week:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Averages of produced/scheduled per week/day
exports.averageCardProducedWeekly = async (req, res) => {
  try {
    const totalProduced = await requestModel.count({
      where: { status: "Produced" },
    });

    const totalScheduled = await requestModel.count({
      where: { status: "Scheduled" },
    });

    const totalDays = await requestModel.findAll({
      attributes: [
        [
          sequelize.fn(
            "DISTINCT",
            sequelize.fn("DATE", sequelize.col("createdAt"))
          ),
          "day",
        ],
      ],
    });

    const totalWeeks = await requestModel.findAll({
      attributes: [
        [
          sequelize.fn(
            "DISTINCT",
            sequelize.fn("YEARWEEK", sequelize.col("createdAt"))
          ),
          "week",
        ],
      ],
    });

    const averageDailyProduced = totalProduced / totalDays.length || 0;
    const averageWeeklyProduced = totalProduced / totalWeeks.length || 0;
    const averageDailyScheduled = totalScheduled / totalDays.length || 0;
    const averageWeeklyScheduled = totalScheduled / totalWeeks.length || 0;

    res.json({
      averageDailyProduced,
      averageWeeklyProduced,
      averageDailyScheduled,
      averageWeeklyScheduled,
    });
  } catch (error) {
    console.error("Error fetching averages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.viewAllApprovedRequests = async (req, res) => {
  try {
    const requests = await requestModel.findAll({
      where: { status: "Approved" },
      attributes: [
        "userId",
        "userType",
        "requestType",
        "status",
        "createdAt",
        "updatedAt",
      ],
      order: [[col("createdAt"), "ASC"]],
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Format date and time to GMT+1
    const formattedRequests = requests.map((request) => ({
      ...request.dataValues,
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.viewAllApprovedRequestsById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }
  try {
    const requests = await requestModel.findAll({
      where: { status: "Approved", id },
      attributes: [
        "userId",
        "userType",
        "requestType",
        "status",
        "createdAt",
        "updatedAt",
      ],
      order: [[col("createdAt"), "ASC"]],
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Format date and time to GMT+1
    const formattedRequests = requests.map((request) => ({
      ...request.dataValues,
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.viewAllRejectedRequests = async (req, res) => {
  try {
    const requests = await requestModel.findAll({
      where: { status: "Rejected" },
      attributes: [
        "userId",
        "userType",
        "requestType",
        "status",
        "createdAt",
        "updatedAt",
      ],
      order: [[col("createdAt"), "ASC"]],
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Format date and time to GMT+1
    const formattedRequests = requests.map((request) => ({
      ...request.dataValues,
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.viewAllRejectedRequestsById = async (req, res) => {
  const { id } = req.params;
  try {
    const requests = await requestModel.findAll({
      where: { status: "Rejected", id },
      attributes: [
        "userId",
        "userType",
        "requestType",
        "status",
        "createdAt",
        "updatedAt",
      ],
      order: [[col("createdAt"), "ASC"]],
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Format date and time to GMT+1
    const formattedRequests = requests.map((request) => ({
      ...request.dataValues,
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.viewAllPendingRequests = async (req, res) => {
  try {
    const requests = await requestModel.findAll({
      where: { status: "Pending" },
      attributes: [
        "userId",
        "userType",
        "requestType",
        "status",
        "createdAt",
        "updatedAt",
      ],
      order: [[col("createdAt"), "ASC"]],
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Format date and time to GMT+1
    const formattedRequests = requests.map((request) => ({
      ...request.dataValues,
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.viewAllPendingRequestsById = async (req, res) => {
  const { id } = req.params;
  try {
    const requests = await requestModel.findAll({
      where: { status: "Pending", id },
      attributes: [
        "userId",
        "userType",
        "requestType",
        "status",
        "createdAt",
        "updatedAt",
      ],
      order: [[col("createdAt"), "ASC"]],
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Format date and time to GMT+1
    const formattedRequests = requests.map((request) => ({
      ...request.dataValues,
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Get a specific request by ID
exports.viewRequestsById = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await requestModel.findByPk(id, {
      attributes: [
        "userId",
        "userType",
        "requestType",
        "status",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Format date and time to GMT+1
    const formattedRequest = {
      ...request.dataValues,
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    };

    res.status(200).json(formattedRequest); // Return the found request
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
      attributes: [
        "userId",
        "userType",
        "requestType",
        "status",
        "createdAt",
        "updatedAt",
      ],
      order: [[col("createdAt"), "ASC"]],
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Format date and time to GMT+1
    const formattedRequests = requests.map((request) => ({
      ...request.dataValues,
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    }));

    res.status(200).json(formattedRequests);
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
      attributes: [
        "userId",
        "userType",
        "requestType",
        "status",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Format date and time to GMT+1
    const formattedRequest = {
      ...request.dataValues,
      createdAt: formatDateInGMTPlus1(request.createdAt),
      updatedAt: formatDateInGMTPlus1(request.updatedAt),
    };

    res.status(200).json(formattedRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error:", error: error.message });
  }
};
