const express = require("express");
const { createReport, getReportByAppointmentId, getHandledAppointmentsByDepartment } = require("../controllers/reportPrescriptionController");
const router = express.Router();

router.post("/appointment/:appointmentId", createReport);
router.get("/appointment/:appointmentId", getReportByAppointmentId);
router.get(
  "/handled/department/:departmentId",
  getHandledAppointmentsByDepartment
);

module.exports = router;
