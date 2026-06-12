
exports.loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const query = {
        "userId": Number(userId),
        password
    }

    const user = await req.collections.users.findOne(query);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid ID or Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.profile.name,
        role: user.role,
        userId: user.userId,
        department: user.professional.department,
        designation: user.professional.designation
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};