const Club = require("../models/Club");
import { Request, Response } from "express";

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Creates new club
// @route POST /clubs
// @access Private
const createNewClub = asyncHandler(async (req: Request, res: Response) => {});

export { createNewClub };
