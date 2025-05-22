const express = require("express");
const expenses = require("./expenses");
const auth = require("./auth");
const apiDocs = require("./apiDocs");

const router = express.Router();

router.use("/expenses", expenses);
router.use("/auth", auth);
router.use("/api-docs", apiDocs);

module.exports = router;
