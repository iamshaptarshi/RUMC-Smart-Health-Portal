const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUser,
  getUserById,
} = require("../controllers/usersController");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", addUser);

module.exports = router;
