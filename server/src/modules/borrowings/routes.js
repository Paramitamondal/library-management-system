const express = require("express");
const router = express.Router();
const {
  getBorrowings,
  getBorrowingById,
  issueBook,
  returnBook,
} = require("./controller");
const { protect } = require("../../middleware/auth");
const { adminOnly } = require("../../middleware/role");

router.get("/", protect, getBorrowings);
router.get("/:id", protect, getBorrowingById);
router.post("/issue", protect, adminOnly, issueBook);
router.post("/:id/return", protect, adminOnly, returnBook);

module.exports = router;