const { getDB } = require("../config/db");

const attachDB = (req, res, next) => {
  try {
    const db = getDB();
    
    req.collections = {
      users: db.collection("Users"),
      departments: db.collection("Departments"),
      schedules: db.collection("Schedules"),
      appointments: db.collection("Appointments"),
      reports: db.collection("Reports"),
      tests: db.collection("tests")
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = attachDB;
