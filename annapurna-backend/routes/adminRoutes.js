const router = require("express").Router();
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");

router.get("/users", verifyToken, checkRole("ADMIN"), adminController.getAllUsers);
router.get("/report", verifyToken, checkRole("ADMIN"), adminController.getReport);
router.get("/donations", verifyToken, checkRole("ADMIN"), adminController.getAllDonations);

router.get("/test", (req, res) => {
  res.json({ ok: true });
});
module.exports = router;