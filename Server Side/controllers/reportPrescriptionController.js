const { ObjectId } = require("mongodb");

exports.createReport = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { medicines, tests, notes, status } = req.body;

    // CLEAN DATA
    const cleanedTests = (tests || []).filter((t) => t && t.name);

    const cleanedMedicines = (medicines || []).filter(
      (m) =>
        m &&
        (m.name?.trim() !== "" ||
          m.dose?.trim() !== "" ||
          m.duration?.trim() !== ""),
    );

    const hasTests = cleanedTests.length > 0;
    const hasMedicines = cleanedMedicines.length > 0;

    // SAVE REPORT
    await req.collections.reports.insertOne({
      appointmentId: new ObjectId(appointmentId),
      medicines: cleanedMedicines,
      tests: cleanedTests,
      notes,
      createdAt: new Date(),
    });

    // UPDATE APPOINTMENT
    await req.collections.appointments.updateOne(
      { _id: new ObjectId(appointmentId) },
      {
        $set: {
          status,
          "metaData.isActive": false,
          "metaData.completedAt": new Date(),
        },
      },
    );

    res.status(200).json({ message: "Report saved", status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReportByAppointmentId = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const result = await req.collections.reports.findOne({
      appointmentId: new ObjectId(appointmentId),
    });

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReportsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await req.collections.appointments
      .find({ "patient.id": Number(patientId) })
      .project({ _id: 1 })
      .toArray();

    const appointmentIds = appointments.map((appt) => new ObjectId(appt._id));

    const reports = await req.collections.reports
      .find({ appointmentId: { $in: appointmentIds } })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).send(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getHandledAppointmentsByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const result = await req.collections.appointments
      .find({
        "department.id": departmentId,
        status: { $in: ["completed", "processing"] },
      })
      .sort({ "metaData.completedAt": -1 })
      .toArray();

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
