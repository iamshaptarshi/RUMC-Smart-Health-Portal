exports.getSchedules = async (req, res) => {
  try {
    const schedules = await req.collections.schedules.find().toArray();
    res.status(201).send(schedules);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addSchedule = async (req, res) => {
  try {
    const schedule = req.params;
    const result = await req.collection.schedules.insertOne(schedule);
    res.status(201).send(result);
  } catch {}
};
