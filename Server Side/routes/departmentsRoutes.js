const express = require("express");
const router = express.Router();

const { getDepartments, addDepartment } = require("../controllers/departmentsController");

router.get("/", getDepartments);
router.post("/", addDepartment);

module.exports = router;