const express = require("express");
const { getTests } = require("../controllers/testsController");
const router = express.Router();

router.get("/", getTests);

module.exports = router;