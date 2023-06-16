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
  const { position, description, message } = req.body;
  const organization = req.session.id;

  if (!position || !description || !message || !organization) {
    res.status(400).send("All fields are required or error w/ sign in");
  }

  const newPosition = new Position({
    _id: uuidv4(),
    organization,
    position,
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

const deletePosition = async (req: Request, res: Response) => {};

const updatePosition = async (req: Request, res: Response) => {};

export { getPositionById, createPosition, deletePosition, updatePosition };
