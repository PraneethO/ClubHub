// Functions wanted: get positions by id, apply to position, get position details, create + delete + change position, (temp) get all positios
import { Request, Response } from "express";
import Position from "../models/Position";
import Organization from "../models/Organization";

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

  const orgName = await Organization.findOne({ _id: organization })
    .select("name")
    .lean()
    .exec();

  console.log(orgName);

  const newPosition = new Position({
    _id: uuidv4(),
    orgId: organization,
    orgName: orgName.name,
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

const getAllPositions = async (req: Request, res: Response) => {
  try {
    const positions = await Position.find(
      {},
      { title: 1, description: 1, orgName: 1 }
    )
      .lean()
      .exec();
    return res.status(200).json(positions);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export default {
  getPositionById,
  createPosition,
  deletePosition,
  updatePosition,
  getPositionByOrganization,
  getAllPositions,
};
