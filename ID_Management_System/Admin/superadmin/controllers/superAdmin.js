// view all requests
// view new requests by id
const requestModel = require("../../../User/Request/models/Request");
const { sequelize } = require("../../../DatabaseServer/db");
const { Op, fn, col } = require("sequelize");

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
    });

    if (!dailyRequests || dailyRequests.length === 0) {
      return res.status(404).json({ message: "Request not found." });
    }
    res.json(dailyRequests);
  } catch (error) {
    console.error("Error fetching daily requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieve request made each day
exports.requestsPerDay = async (req, res) => {
  try {
    // Query the database to group requests by the date (ignoring time)
    const requestsPerDay = await requestModel.findAll({
      attributes: [
        [fn("DATE", col("createdAt")), "date"],
        [fn("TIME", col("createdAt")), "time"],
        "userId",
        "userType",
        "requestType",
        "status",
      ],
      order: [[col("createdAt"), "ASC"]],
    });
    res.json(requestsPerDay);
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

exports.viewTotalCards = async (req, res) => {
  try {
    const totalCardsProduced = await requestModel.count({
      where: {
        status: "Produced",
      },
    });
    if (!totalCardsProduced || totalCardsProduced.length === 0) {
      return res.status(404).json({ message: "No cards produced." });
    }
    res.json(totalCardsProduced);
  } catch (error) {
    console.error("Error fetching total ID cards produced:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.totalCardsProducedWeekly = async (req, res) => {
  try {
    const results = await requestModel.findAll({
      attributes: [
        [sequelize.fn("YEARWEEK", "week", sequelize.col("createdAt")), "week"], // Group by week
        [sequelize.fn("COUNT", sequelize.col("id")), "totalProduced"],
      ],
      where: {
        status: "Produced",
      },
      group: [sequelize.fn("YEARWEEK", "week", sequelize.col("createdAt"))],
      order: [
        [sequelize.fn("YEARWEEK", "week", sequelize.col("createdAt")), "ASC"],
      ], // Order by week
    });

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No cards produced." });
    }
    res.json(results);
  } catch (error) {
    console.error("Error fetching total ID cards produced per week:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.averageCardProducedWeekly = async (req, res) => {
  try {
    // Total produced ID cards
    const totalProduced = await requestModel.count({
      where: {
        status: "Produced", // Change this if your status for produced cards is different
      },
    });

    // Total scheduled ID cards
    const totalScheduled = await requestModel.count({
      where: {
        status: "Scheduled", // Change this if your status for scheduled cards is different
      },
    });

    // Get the total number of days and weeks for the average calculations
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
            sequelize.fn("YEARWEEK", "week", sequelize.col("createdAt"))
          ),
          "week",
        ],
      ],
    });

    const averageDailyProduced = totalProduced / totalDays.length || 0; // Average produced per day
    const averageWeeklyProduced = totalProduced / totalWeeks.length || 0; // Average produced per week
    const averageDailyScheduled = totalScheduled / totalDays.length || 0; // Average scheduled per day
    const averageWeeklyScheduled = totalScheduled / totalWeeks.length || 0; // Average scheduled per week

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
      order: [["createdAt", "DESC"]],
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
