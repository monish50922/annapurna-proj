const User = require("../models/user");
const Donation = require("../models/donation");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role", "createdAt"],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Get dashboard report
exports.getReport = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalDonations = await Donation.count();
    const claimedDonations = await Donation.count({
      where: { status: "CLAIMED" },
    });

    res.json({
      totalUsers,
      totalDonations,
      claimedDonations,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching report" });
  }
};

// Get all donations (ADMIN)
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      include: [
        { model: User, as: "donor", attributes: ["name"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching donations" });
  }
};