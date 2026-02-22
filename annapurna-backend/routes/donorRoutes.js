const router = require("express").Router();
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const { getDonorDonations } = require("../controllers/donationController");

router.get("/donations", verifyToken, checkRole("DONOR"), getDonorDonations);

module.exports = router;
