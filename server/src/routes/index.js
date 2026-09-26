const express = require("express");
const router = express.Router();

router.use("/auth", require("../modules/auth/routes"));
router.use("/categories", require("../modules/categories/routes"));
router.use("/books", require("../modules/books/routes"));
router.use("/members", require("../modules/members/routes"));
router.use("/borrowings", require("../modules/borrowings/routes"));
router.use("/dashboard", require("../modules/dashboard/routes"));

module.exports = router;