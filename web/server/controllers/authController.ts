import { Request, Response } from "express";
import User from "../models/User";

const bcrypt = require("bcrypt");

declare module "express-session" {
  interface SessionData {
    loggedIn?: boolean;
    userId?: string;
  }
}

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
  const user = await User.findOne({ email }).lean().exec();

  if (!user) {
    return res
      .status(409)
      .json({ message: "Looks like you haven't signed up." });
  }

  // Check password
  bcrypt.compare(
    password,
    user.password,
    (err: any, passwordMatch: boolean) => {
      if (err) {
        return res.status(500).json({ message: `${err}` });
      }
      if (passwordMatch) {
        req.session.loggedIn = true;
        req.session.userId = user._id;
        return res.status(201).json({ message: "Logged in" });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    }
  );
};

// @desc Logs out user
// @route DELETE /api/auth
// @access Private
const logoutUser = async (req: Request, res: Response) => {
  req.session.loggedIn = false;
  req.session.userId = null;
  return res.status(201).json({ message: "Logged out" });
};

// @route POST /api/auth
const checkUserStatus = async (req: Request, res: Response) => {
  if (await req.session.userId) {
    const user = await User.findOne({ _id: req.session.userId }).lean().exec();
    return res.status(200).json(user);
  } else {
    return res.status(403).json({ message: "Not logged in" });
  }
};

export { logoutUser, loginUser, checkUserStatus };
