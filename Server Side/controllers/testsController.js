exports.getTests = async (req, res) => {
  try {
    const tests = await req.collections.tests
      .find()
      .sort({ name: 1 }) // alphabetical
      .toArray();

    res.send(tests);
  } catch (err) {
    res.status(500).send({ message: "Error fetching tests" });
  }
};