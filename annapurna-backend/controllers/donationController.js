const Donation = require("../models/donation");
const User = require("../models/user");


// ================= CREATE DONATION =================
exports.createDonation = async (req, res) => {

  try {

    const {
      food_type,
      quantity,
      quantity_unit,
      location,
      pickup_time,
      event_type
    } = req.body;

    if (!food_type || !quantity || !location || !pickup_time || !event_type) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (food_type.length < 3) {
      return res.status(400).json({
        message: "Food type must be at least 3 characters",
      });
    }

    // Format quantity nicely (example: "50 meals")
    const formattedQuantity = quantity_unit
      ? `${quantity} ${quantity_unit}`
      : quantity;

    const donation = await Donation.create({
      food_type,
      quantity: formattedQuantity,
      location,
      pickup_time,
      event_type,
      donorId: req.user.id,
      status: "AVAILABLE",
    });

    res.json({
      message: "Donation created successfully",
      donation,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }
};



// ================= GET ALL DONATIONS =================
exports.getAllDonations = async (req, res) => {

  try {

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

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};



// ================= CLAIM DONATION =================
exports.claimDonation = async (req, res) => {

  try {

    const id = req.params.id;

    const donation = await Donation.findByPk(id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    if (donation.status !== "AVAILABLE") {
      return res.status(400).json({
        message: "Donation already claimed",
      });
    }

    await donation.update({
      status: "CLAIMED",
      ngoId: req.user.id,
    });

    res.json({
      message: "Donation claimed successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};



// ================= DONOR DONATIONS =================
exports.getDonorDonations = async (req, res) => {

  try {

    const donations = await Donation.findAll({
      where: { donorId: req.user.id },
    });

    res.json(donations);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};



// ================= NGO DONATIONS =================
exports.getNgoDonations = async (req, res) => {

  try {

    const donations = await Donation.findAll({
      where: { ngoId: req.user.id },
      include: [
        {
          model: User,
          as: "donor",
          attributes: ["name"],
        },
      ],
    });

    res.json(donations);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};



// ================= MARK PICKED =================
exports.markPicked = async (req, res) => {

  try {

    const id = req.params.id;

    const donation = await Donation.findByPk(id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    if (donation.ngoId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized action",
      });
    }

    await donation.update({
      status: "PICKED",
    });

    res.json({
      message: "Marked as picked",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};



// ================= MARK DELIVERED =================
exports.markDelivered = async (req, res) => {

  try {

    const id = req.params.id;

    const donation = await Donation.findByPk(id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    if (donation.ngoId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized action",
      });
    }

    await donation.update({
      status: "DELIVERED",
    });

    res.json({
      message: "Marked as delivered",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};