const Club = require("../models/Club");
import { Request, Response } from "express";

const bcrypt = require("bcrypt");

// @desc Creates new club
// @route POST /clubs
// @access Private
const createNewClub = async (req: Request, res: Response) => {};

export { createNewClub };
