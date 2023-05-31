const User = require("../models/User");

const asyncHandler = require("express-async-handler");

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
  getUserInfo,
  updateUser,
  deleteUser,
};
