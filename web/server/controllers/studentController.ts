import Student from "../models/Student";
import { Request, Response } from "express";

const uuidv4 = require("uuid").v4;
const bcrypt = require("bcrypt");

// @desc Create new student
// @route POST /api/student
// @access Private
const createNewStudent = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, grade, state } = req.body;

  // Confirm Data
  if (!firstName || !lastName || !email || !password || !state || !grade) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for Duplicate
  const duplicate = await Student.findOne({ email }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  const hashedPwd = await bcrypt.hash(password, 10); // Password Hash

  // Create and Store Student
  const newStudent = new Student({
    _id: uuidv4(),
    firstName,
    lastName,
    email,
    password: hashedPwd,
    state,
    grade,
  });
  await newStudent
    .save()
    .then((result: any) => {
      req.session.loggedIn = true;
      req.session.id = newStudent._id;
      return res.status(201).json({ message: `New student ${email} created` });
    })
    .catch((error: string) => {
      return res.status(500).json({ message: "Internal server error" });
      console.log(error);
    });
};

// @desc Get student info
// @route GET /api/student
// @access Private
const getStudentInfo = async (req: Request, res: Response) => {
  if (req.session.loggedIn && req.session.id) {
    res.send(req.session.id);
  }
};

// @desc Update student info
// @route PATCH /api/student
// @access Private
const updateStudent = async (req: Request, res: Response) => {
  const updatedStudentInfo = req.body;

  try {
    // Update the user in the database
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: req.session.id },
      { $set: updatedStudentInfo },
      { new: true }
    )
      .lean()
      .exec();

    if (updatedStudent) {
      return res
        .status(200)
        .json({ message: "User updated successfully", user: updatedStudent });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Delete student
// @route DELETE /api//student
// @access Private
const deleteStudent = async (req: Request, res: Response) => {};

export { createNewStudent, getStudentInfo, updateStudent, deleteStudent };
