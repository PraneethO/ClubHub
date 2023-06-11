import Organization from "../models/Organization";
import { Request, Response } from "express";

const uuidv4 = require("uuid").v4;
const bcrypt = require("bcrypt");

// Functions needed: create new club, delete club, update club info,

// @desc Creates new organization
// @route
const createNewOrg = async (req: Request, res: Response) => {};

const deleteOrg = async (req: Request, res: Response) => {};

const updateOrg = async (req: Request, res: Response) => {};

const getOrgInfo = async (req: Request, res: Response) => {};

export { createNewOrg, deleteOrg, updateOrg, getOrgInfo };
