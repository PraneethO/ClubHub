// Functions wanted: get positions by id, apply to position, get position details
import { Request, Response } from "express";
import Position from "../models/Position";

const getPositionById = async (req: Request, res: Response) => {
  const positionId = req.params.id;

  const position = await Position.findOne({ _id: positionId }).lean().exec();

  if (position) {
    return res.status(201).send(position);
  }

  return res.status(404).send({
    message: `Position ${positionId} not found. Please try again later.`,
  });
};

export { getPositionById };
