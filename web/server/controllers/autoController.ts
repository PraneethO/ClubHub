import { Response, Request } from "express";
import fs from "fs";
import path from "path";

import Student from "../models/Student";
import Organization from "../models/Organization";

const schoolAutoCorrect = (req: Request, res: Response) => {
  const { query } = req.query;

  const results: any[] = [];

  const filePath = path.join(__dirname, "schools.txt");
  const fileStream = fs.createReadStream(filePath, "utf8");

  let data = "";
  fileStream
    .on("data", (chunk) => {
      data += chunk;
    })
    .on("end", () => {
      const lines = data.split("\n");
      lines.forEach((line: string) => {
        const schoolName = line.trim();
        if (
          (schoolName as string)
            .toLowerCase()
            .startsWith((query as string).toLowerCase())
        ) {
          results.push({ value: schoolName, label: schoolName });
        }
      });
      res.json(results);
    })
    .on("error", (error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const searchAll = async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    // Perform the search query in the "users" and "organizations" collections

    const sanitizedQuery = query
      .toString()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const userQuery = Student.find({
      name: { $regex: `^${sanitizedQuery}`, $options: "i" },
    }).select("name _id");

    const organizationQuery = Organization.find({
      name: { $regex: `^${sanitizedQuery}`, $options: "i" },
    }).select("name _id");

    const [users, organizations] = await Promise.all([
      userQuery.lean().exec(),
      organizationQuery.lean().exec(),
    ]);

    const userSuggestions = users.map((user) => ({ ...user, type: 1 }));
    const organizationSuggestions = organizations.map((org) => ({
      ...org,
      type: 0,
    }));

    const suggestions = [...userSuggestions, ...organizationSuggestions];
    res.status(201).json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default { schoolAutoCorrect, searchAll };
