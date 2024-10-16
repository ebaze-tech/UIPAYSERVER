const Request = require("../../models/requests/Request");
const Notification = require("../../models/notification/notification");

const setPickupDate = async (req, res) => {
  const { requestId } = req.params;
  const { pickupDate } = req.body;

  try {
    const request = await Request.findByPk(requestId);
    request.pickupDate = pickupDate;
    await request.save();

    // Notify the admin and user
    await Notification.create({
      recipient: request.userId,
      message: `Your ID card will be ready for pickup on ${pickupDate}.`,
    });

    res.status(200).json({ message: "Pickup date set and user notified." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = setPickupDate;
