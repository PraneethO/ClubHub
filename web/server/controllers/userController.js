const User = require("../models/User");

const asyncHandler = require("express-async-handler");

const uuidv4 = require("uuid").v4;
const bcrypt = require("bcrypt");

// @desc Create new user
// @route POST /api/users
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
    _id: uuidv4(),
    firstName,
    lastName,
    email,
    password: hashedPwd,
    state,
    grade,
  });
  await newUser
    .save()
    .then((result) => {
      req.session.loggedIn = true;
      req.session.userId = newUser._id;
      return res.status(201).json({ message: `New user ${email} created` });
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal server error" });
      console.log(error);
    });
});

// @desc Get user info
// @route GET /api/users
// @access Private
const getUserInfo = asyncHandler(async (req, res) => {
  if (req.session.loggedIn && req.session.userId) {
    res.send(req.session.userId);
  }
});

// @desc Update user info
// @route PATCH /api/users
// @access Private
const updateUser = asyncHandler(async (req, res) => {});

// @desc Delete user
// @route DELETE /api//users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {});

module.exports = {
  createNewUser,
  getUserInfo,
  updateUser,
  deleteUser,
};
