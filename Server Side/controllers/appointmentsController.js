const { ObjectId } = require("mongodb");

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await req.collections.appointments.find().toArray();
    res.status(200).send(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const query = {
      "patient.id": Number(patientId),
    };

    const result = await req.collections.appointments
      .find(query)
      .sort({ "metaData.bookingTime": -1 })
      .toArray();

    res.status(200).send(result);
  } catch (error) {}
};

exports.getCurrentAppointment = async (req, res) => {
  try {
    const { patientId } = req.params;
    const query = {
      "patient.id": Number(patientId),
      status: "pending",
    };
    const result = await req.collections.appointments.findOne(query, {
      sort: { "metaData.bookingTime": -1 },
    });

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getLatestAppointmentForVirtual = async (req, res) => {
  try {
    const { patientId } = req.params;

    const result = await req.collections.appointments.findOne(
      {
        "patient.id": Number(patientId),
        status: { $in: ["processing", "virtual_pending"] },
      },
      {
        sort: { "metaData.bookingTime": -1 },
      },
    );

    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getActiveAppointmentsByDepartmentId = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const query = {
      status: "pending",
      "metaData.isActive": true,
    };

    // filter by department (your current system)
    if (departmentId) {
      query["department.id"] = departmentId;
    }

    const result = await req.collections.appointments
      .find(query)
      .sort({ serialNo: 1 }) // queue order
      .toArray();

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addAppointments = async (req, res) => {
  try {
    const appointmentData = req.body;
    const result =
      await req.collections.appointments.insertOne(appointmentData);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const result = await req.collections.appointments.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: "cancelled",
          "metaData.isActive": false,
          "metaData.cancelledBy": "user",
          "metaData.cancelReason": reason || null,
          "metaData.cancelledAt": new Date(),
        },
      },
    );

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateQuery = req.body;

    if (!updateQuery || Object.keys(updateQuery).length === 0) {
      return res.status(400).json({ message: "Empty update query" });
    }

    const allowedOperators = ["$set", "$inc", "$push"];

    const isValid = Object.keys(updateQuery).every((key) =>
      allowedOperators.includes(key),
    );

    if (!isValid) {
      return res.status(400).json({ message: "Invalid update operator" });
    }

    const result = await req.collections.appointments.updateOne(
      { _id: new ObjectId(id) },
      updateQuery,
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No document updated" });
    }

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAbsentAppointments = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const query = {
      status: "quarantined",
      "metaData.isActive": true,
      "department.id": departmentId,
    };

    const result = await req.collections.appointments.find(query).toArray();

    console.log(res.status(200).send(result));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getVirtualRequestsByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const result = await req.collections.appointments
      .find({
        "department.id": departmentId,
        status: { $in: ["virtual_pending", "approved"] },
      })
      .toArray();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
