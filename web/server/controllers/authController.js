const User = require("../models/User");

const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const uuidv4 = require("uuid").v4;

// @desc Create new user
// @route POST /api/auth
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
  newUser
    .save()
    .then((result) => {
      req.session.loggedIn = true;
      req.session.userId = _id;
      res.status(201).json({ message: `New user ${email} created` });
    })
    .catch((error) => {
      res.status(500).json({ message: `${error}` });
      console.log(error);
    });
});

// @desc Logs in user
// @route GET /api/auth
// @access Private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Confirm Data
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
  }

  // Find user
  const user = User.findOne({ email }).lean().exec();

  if (!user) {
    res.status(409).json({ message: "Looks like you haven't signed up." });
  }

  // Check password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    req.session.loggedIn = true;
    req.session.userId = user._id;
    res.status(200).json({ message: "Logged in" });
  } else {
    res.status(409).json({ message: "Incorrect password" });
  }
});

// @desc Logs out user
// @route DELETE /api/auth
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  req.session.loggedIn = false;
  req.session.userId = null;
  res.status(200).json({ message: "Logged out" });
});

module.exports = {
  createNewUser,
  logoutUser,
  loginUser,
};
