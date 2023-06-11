import User from "../models/User";
import { Request, Response } from "express";

const uuidv4 = require("uuid").v4;
const bcrypt = require("bcrypt");

// @desc Create new user
// @route POST /api/users
// @access Private
const createNewUser = async (req: Request, res: Response) => {
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
    .then((result: any) => {
      req.session.loggedIn = true;
      req.session.userId = newUser._id;
      return res.status(201).json({ message: `New user ${email} created` });
    })
    .catch((error: string) => {
      return res.status(500).json({ message: "Internal server error" });
      console.log(error);
    });
};

// @desc Get user info
// @route GET /api/users
// @access Private
const getUserInfo = async (req: Request, res: Response) => {
  if (req.session.loggedIn && req.session.userId) {
    res.send(req.session.userId);
  }
};

// @desc Update user info
// @route PATCH /api/users
// @access Private
const updateUser = async (req: Request, res: Response) => {
  const updatedUserInfo = req.body;

  try {
    // Update the user in the database
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.session.userId },
      { $set: updatedUserInfo },
      { new: true }
    )
      .lean()
      .exec();

    if (updatedUser) {
      return res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Delete user
// @route DELETE /api//users
// @access Private
const deleteUser = async (req: Request, res: Response) => {};

export { createNewUser, getUserInfo, updateUser, deleteUser };
