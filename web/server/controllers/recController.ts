import Organization from "../models/Organization";
import Student from "../models/Student";
import Position from "../models/Position";

import { Request, Response } from "express";

// functions needed: get positions on main page (based on school, region, interested areas), get organization in school, get organization in area w/ rec

// @desc Get positions for main page
// @route GET /api/positions
const getPositionRec = async (req: Request, res: Response) => {};

const getOrganizationRec = async (req: Request, res: Response) => {
  return res.send({ message: "hello world" });
};

export default { getPositionRec, getOrganizationRec };
