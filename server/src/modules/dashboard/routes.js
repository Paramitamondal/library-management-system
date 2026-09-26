const express = require("express");
const router = express.Router();
const { getStatistics, getRecentActivity } = require("./controller");
const { protect } = require("../../middleware/auth");
const { adminOnly } = require("../../middleware/role");

router.get("/statistics", protect, adminOnly, getStatistics);
router.get("/recent-activity", protect, adminOnly, getRecentActivity);

module.exports = router;