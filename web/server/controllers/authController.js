const User = require("../models/User");

const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");

// @desc Logs in user
// @route POST /api/auth
// @access Private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Confirm Data
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find user
  const user = await User.findOne({ email }).lean().exec();

  console.log(user);

  if (!user) {
    return res
      .status(409)
      .json({ message: "Looks like you haven't signed up." });
  }

  // Check password
  bcrypt.compare(password, user.password, (err, passwordMatch) => {
    if (err) {
      return res.status(500).json({ message: `${err}` });
    }
    if (passwordMatch) {
      req.session.loggedIn = true;
      req.session.userId = user._id;
      return res.status(200).json({ message: "Logged in" });
    } else {
      return res.status(409).json({ message: "Incorrect password" });
    }
  });
});

// @desc Logs out user
// @route DELETE /api/auth
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  req.session.loggedIn = false;
  req.session.userId = null;
  return res.status(200).json({ message: "Logged out" });
});

module.exports = {
  logoutUser,
  loginUser,
};
