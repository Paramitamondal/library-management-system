const express = require("express");
const router = express.Router();
const {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deactivateMember,
  getMyProfile,
} = require("./controller");
const { protect } = require("../../middleware/auth");
const { adminOnly } = require("../../middleware/role");

router.get("/me/profile", protect, getMyProfile);
router.get("/", protect, adminOnly, getMembers);
router.get("/:id", protect, getMemberById);
router.post("/", protect, adminOnly, createMember);
router.put("/:id", protect, adminOnly, updateMember);
router.delete("/:id", protect, adminOnly, deactivateMember);

module.exports = router;