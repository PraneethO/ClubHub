import { Response, Request } from "express";
import fs from "fs";
import path from "path";

const schoolAutoCorrect = (req: Request, res: Response) => {
  var { query } = req.query;
  if (!query) {
    query = "N";
  }
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

export { schoolAutoCorrect };
