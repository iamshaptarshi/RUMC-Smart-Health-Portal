exports.getDepartments = async (req, res) => {
  try {
    const departments = await req.collections.departments.find().toArray();

    const departmentWithStatus = departments.map((department) => {
      const status = getDepartmentStatus(department);

      return {
        ...department,
        status,
      };
    });
    res.send(departmentWithStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addDepartment = async (req, res) => {
  try {
    const department = req.body;
    const result = await req.collections.departments.insertOne(department);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getDepartmentStatus = (department) => {
  const now = new Date();

  const currentDay = now.toLocaleString("en-US", { weekday: "long" });
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const slots = department.schedule.slots;

  let activeSlot = null;
  let nextSlotToday = null;

  // ❌ Off day → find next working day
  if (department.schedule.offDays.includes(currentDay)) {
    return {
      status: "closed",
      message: "Currently Closed",
      nextOpen: getNextWorkingDayOpening(department),
    };
  }

  // 🔁 Check today's slots
  for (let slot of slots) {
    const start = toMinutes(slot.start);
    const end = toMinutes(slot.end);

    // ✅ ACTIVE
    if (currentTime >= start && currentTime <= end) {
      activeSlot = slot;
      break;
    }

    // 📌 Next slot today
    if (currentTime < start) {
      if (!nextSlotToday || toMinutes(nextSlotToday.start) > start) {
        nextSlotToday = slot;
      }
    }
  }

  // ✅ OPEN
  if (activeSlot) {
    return {
      status: "open",
      displayTime: `${formatTime(activeSlot.start)} - ${formatTime(activeSlot.end)}`,
      type: activeSlot.type,
    };
  }

  // ❌ CLOSED but next slot TODAY exists
  if (nextSlotToday) {
    return {
      status: "closed",
      message: "Currently Closed",
      nextOpen: `${formatTime(nextSlotToday.start)}`,
    };
  }

  // ❌ No slots left today → find next working day
  return {
    status: "closed",
    message: "Currently Closed",
    nextOpen: getNextWorkingDayOpening(department),
  };
};

const getNextWorkingDayOpening = (department) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const todayIndex = new Date().getDay();

  for (let i = 1; i <= 7; i++) {
    const nextDay = days[(todayIndex + i) % 7];

    if (!department.schedule.offDays.includes(nextDay)) {
      const firstSlot = department.schedule.slots[0];

      return `${nextDay} at ${formatTime(firstSlot.start)}`;
    }
  }

  return "Closed";
};

const toMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const formatTime = (time) => {
  let [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")}${ampm}`;
};
//------For inserting multiple departments at once, if needed in the future-------

// exports.addDepartment = async (req, res) => {
//   try {
//     const departments = req.body; // expect array

//     if (!Array.isArray(departments)) {
//       return res
//         .status(400)
//         .json({ message: "Expected an array of departments" });
//     }

//     const result = await req.collections.departments.insertMany(departments);

//     res.status(201).send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
