import { Request, Response } from "express";

// Update profile picture
const updateImage = async (req: Request, res: Response) => {
  console.log(req.file);

  return res.status(201).send("All good");
};

// Update resume
const updateResume = async (req: Request, res: Response) => {};

// Add in other images (later)

export default { updateImage, updateResume };
