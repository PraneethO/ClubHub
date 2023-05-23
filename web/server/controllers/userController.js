const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, grade, state } = req.body;

  // Confirm Data
  if (!firstName || !lastName || !email || !password || !state || !grade) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for Duplicate
  const duplicate = await User.findOne({ email }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  const hashedPwd = await bcrypt.hash(password, 10); // Password Hash

  // Create and Store User
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPwd,
    state,
    grade,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({ message: "New user ${username} created" });
    })
    .catch((error) =>
      res.status(500).json({ message: "Internal server error" })
    );
});

module.exports = {
  createNewUser,
};
