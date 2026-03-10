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
        {
          model: User,
          as: "donor",
          attributes: ["name"],
        },
        {
          model: User,
          as: "ngo",
          attributes: ["name"],
          required: false   // ⭐ IMPORTANT
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(donations);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

};
// Delete donation (ADMIN)
exports.deleteDonation = async (req, res) => {

  try {

    const id = req.params.id;

    const donation = await Donation.findByPk(id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    await donation.destroy();

    res.json({ message: "Donation deleted successfully" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

};