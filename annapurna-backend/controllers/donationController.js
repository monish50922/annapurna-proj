const Donation = require("../models/donation");
const User = require("../models/user");

exports.createDonation = async (req, res) => {
  await Donation.create({
    food_type: req.body.food_type,
    quantity: req.body.quantity,
    location: req.body.location,
    pickup_time: req.body.pickup_time,
    event_type: req.body.event_type,   // ⭐ ADD THIS LINE
    donorId: req.user.id,
    status: "AVAILABLE",
  });

  res.json({ message: "Donation created successfully" });
};

exports.getAllDonations = async (req, res) => {
  const donations = await Donation.findAll({
    where: { status: "AVAILABLE" },
    include: [
      {
        model: User,
        as: "donor",
        attributes: ["name"],
      },
    ],
  });

  res.json(donations);
};

exports.claimDonation = async (req, res) => {
  const id = req.params.id;

  await Donation.update(
    { status: "CLAIMED", ngoId: req.user.id },
    { where: { id } }
  );

  res.json({ message: "Donation claimed successfully" });
};

exports.getDonorDonations = async (req, res) => {
  const donations = await Donation.findAll({
    where: { donorId: req.user.id },
  });

  res.json(donations);
};

exports.getNgoDonations = async (req, res) => {
  const donations = await Donation.findAll({
    where: { ngoId: req.user.id },
    include: [{ model: User, as: "donor", attributes: ["name"] }],
  });

  res.json(donations);
};
exports.markPicked = async (req, res) => {
  const id = req.params.id;

  await Donation.update(
    { status: "PICKED" },
    { where: { id, ngoId: req.user.id } }
  );

  res.json({ message: "Marked as picked" });
};

exports.markDelivered = async (req, res) => {
  const id = req.params.id;

  await Donation.update(
    { status: "DELIVERED" },
    { where: { id, ngoId: req.user.id } }
  );

  res.json({ message: "Marked as delivered" });
};