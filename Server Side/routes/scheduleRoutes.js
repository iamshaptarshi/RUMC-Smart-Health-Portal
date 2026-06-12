const express = require("express");
const { getSchedules, addSchedule } = require("../controllers/scheduleController");
const router = express.Router();


router.get("/", getSchedules);
router.post("/", addSchedule);


module.exports = router;