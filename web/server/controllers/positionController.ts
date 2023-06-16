// Functions wanted: get positions by id, apply to position, get position details, create + delete + change position
import { Request, Response } from "express";
import Position from "../models/Position";

const uuidv4 = require("uuid").v4;

const getPositionById = async (req: Request, res: Response) => {
  const positionId = req.params.id;

  if (!positionId) {
    return res.status(500).send("Internal Servor Error");
  }

  const position = await Position.findOne({ _id: positionId }).lean().exec();

  if (position) {
    return res.status(201).json(position);
  }

  return res.status(404).json({
    message: `Position ${positionId} not found. Please try again later.`,
  });
};

const createPosition = async (req: Request, res: Response) => {
  const { title, description, message } = req.body;
  const organization = req.session.idUsed;

  if (!title || !description || !message || !organization) {
    return res.status(400).send("All fields are required or error w/ sign in");
  }

  const newPosition = new Position({
    _id: uuidv4(),
    organization,
    title,
    description,
    message,
  });

  await newPosition
    .save()
    .then((result: any) => {
      return res.status(201).json({ message: "New position created" });
    })
    .catch((error: string) => {
      console.log(error);
      return res.status(500).send("Internal servor error");
    });
};

const getPositionByOrganization = async (req: Request, res: Response) => {
  if (req.session.idUsed && !req.session.type) {
    const orgId = req.session.idUsed;

    const positions = await Position.find({ organization: orgId })
      .lean()
      .exec();

    return res.status(201).json(positions);
  } else {
    return res.status(500).send("Internal server error");
  }
};

const deletePosition = async (req: Request, res: Response) => {};

const updatePosition = async (req: Request, res: Response) => {};

export {
  getPositionById,
  createPosition,
  deletePosition,
  updatePosition,
  getPositionByOrganization,
};
