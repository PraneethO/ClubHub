import Organization from "../models/Organization";
import { Request, Response } from "express";

const uuidv4 = require("uuid").v4;
const bcrypt = require("bcrypt");

// Functions needed: create new club, delete club, update club info,

// @desc Creates new organization
// @route POST /api/organization
// @access Private
const createNewOrg = async (req: Request, res: Response) => {
  const { name, email, password, state, field, designation } = req.body;
  // Confirm Data
  if (!name || !email || !password || !state || !field || !designation) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for Duplicate
  const duplicate = await Organization.findOne({ email }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  const hashedPwd = await bcrypt.hash(password, 10); // Password Hash

  // Create and Store Organization
  const newOrg = new Organization({
    _id: uuidv4(),
    name,
    email,
    password: hashedPwd,
    state,
    field,
    designation,
  });
  await newOrg
    .save()
    .then((result: any) => {
      req.session.loggedIn = true;
      req.session.id = newOrg._id;
      return res
        .status(201)
        .json({ message: `New organization ${email} created` });
    })
    .catch((error: string) => {
      return res.status(500).json({ message: "Internal server error" });
      console.log(error);
    });
};

const deleteOrg = async (req: Request, res: Response) => {
  try {
    // Delete the user
    const result = await Organization.deleteOne({ _id: req.session.id }).exec();

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Org deleted successfully" });
    } else {
      return res.status(404).json({ message: "Org not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrg = async (req: Request, res: Response) => {
  const updatedOrgInfo = req.body;

  try {
    // Update the org in the database
    const updatedOrganization = await Organization.findOneAndUpdate(
      { _id: req.session.id },
      { $set: updatedOrgInfo },
      { new: true }
    )
      .lean()
      .exec();

    if (updatedOrganization) {
      return res.status(200).json({
        message: "Org updated successfully",
        org: updatedOrganization,
      });
    } else {
      return res.status(404).json({ message: "Org not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getOrgInfo = async (req: Request, res: Response) => {
  if (req.session.loggedIn && req.session.id) {
    res.send(req.session.id);
  }
};

export { createNewOrg, deleteOrg, updateOrg, getOrgInfo };
