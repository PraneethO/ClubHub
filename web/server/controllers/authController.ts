import { Request, Response } from "express";
import Student from "../models/Student";
import Organization from "../models/Organization";

import bcrypt from "bcrypt";

// @desc Logs in user
// @route POST /api/auth/login
// @access Private
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Confirm Data
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find user
  const student = await Student.findOne({ email }).lean().exec();
  const organization = await Organization.findOne({ email }).lean().exec();

  if (!student && !organization) {
    return res
      .status(409)
      .json({ message: "Looks like you haven't signed up." });
  }

  // Check password
  if (student) {
    bcrypt.compare(
      password,
      student.password,
      (err: any, passwordMatch: boolean) => {
        if (err) {
          return res.status(500).json({ message: `${err}` });
        }
        if (passwordMatch) {
          req.session.loggedIn = true;
          req.session.idUsed = student._id;
          return res.status(201).json({ message: "Logged in", type: 1 });
        } else {
          return res.status(401).json({ message: "Incorrect password" });
        }
      }
    );
  } else {
    bcrypt.compare(
      password,
      organization.password,
      (err: any, passwordMatch: boolean) => {
        if (err) {
          return res.status(500).json({ message: `${err}` });
        }
        if (passwordMatch) {
          req.session.loggedIn = true;
          req.session.idUsed = organization._id;
          return res.status(201).json({ message: "Logged in", type: 0 });
        } else {
          return res.status(401).json({ message: "Incorrect password" });
        }
      }
    );
  }
};

// @desc Logs out user
// @route DELETE /api/auth
// @access Private
const logoutUser = async (req: Request, res: Response) => {
  req.session.loggedIn = false;
  req.session.idUsed = null;
  return res.status(201).json({ message: "Logged out" });
};

// @route POST /api/auth
const checkUserStatus = async (req: Request, res: Response) => {
  if (req.session.idUsed) {
    var user = await Student.findOne({ _id: req.session.idUsed }).lean().exec();
    if (user) {
      delete user.password;
      return res.status(200).json({ user, type: 1 });
    }
    var org = await Organization.findOne({ _id: req.session.idUsed })
      .lean()
      .exec();
    if (!org) {
      res.clearCookie("connect.sid");
    }
    if (org) {
      delete org.password;
      return res.status(200).json({ org, type: 0 });
    }

    return res.status(403).json({ message: "Internal servor error" });
  } else {
    return res.status(403).json({ message: "Not logged in" });
  }
};

const passwordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  const student = await Student.findOne({ _id: req.session.idUsed })
    .lean()
    .exec();
  if (!student) {
    const organization = await Organization.findOne({ _id: req.session.idUsed })
      .lean()
      .exec();
    if (!organization) {
      return res.status(404).json({ message: "User not found" });
    }

    // TODO: Setup email for password reset
  }

  // TODO: Setup email for password reset
};

export default { logoutUser, loginUser, checkUserStatus };
