const router = require("express").Router();
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/donationController");

router.post("/", verifyToken, checkRole("DONOR"), ctrl.createDonation);
router.get("/", verifyToken, checkRole("NGO"), ctrl.getAllDonations);
router.put("/:id/claim", verifyToken, checkRole("NGO"), ctrl.claimDonation);
router.get("/claimed", verifyToken, checkRole("NGO"), ctrl.getNgoDonations);
router.put("/:id/picked", verifyToken, checkRole("NGO"), ctrl.markPicked);
router.put("/:id/delivered", verifyToken, checkRole("NGO"), ctrl.markDelivered);


module.exports = router;
