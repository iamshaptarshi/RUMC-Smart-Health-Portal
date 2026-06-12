const { ObjectId } = require("mongodb");

exports.getUsers = async (req, res) => {
  try {
    const users = await req.collections.users.find().toArray();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = { _id: new ObjectId(userId)};
    const user = await req.collections.users.findOne(query);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addUser = async (req, res) => {
  try {
    const user = req.body;
    const result = await req.collections.users.insertOne(user);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//------For inserting multiple departments at once, if needed in the future-------//

// exports.addUser = async (req, res) => {
//   try {
//     const users = req.body; // expect array

//     if (!Array.isArray(users)) {
//       return res
//         .status(400)
//         .json({ message: "Expected an array of users" });
//     }

//     const result = await req.collections.users.insertMany(users);

//     res.status(201).send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
