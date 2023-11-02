import { NextResponse, NextRequest } from "next/server";

import School from "@/lib/models/School";
import dbConnect from "@/lib/connectDB";

import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const schools = await School.find({}, "name schoolCode").exec();

    const schoolMap = schools.map((school: any) => ({
      name: school.name,
      code: school.schoolCode,
    }));

    return NextResponse.json(
      { message: "Success", body: schoolMap },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching schools:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { name, zip } = await req.json();

  await dbConnect();

  try {
    var schoolCode = "";

    for (let i = 0; i < 8; i++) {
      schoolCode += String.fromCharCode(
        Math.floor(Math.random() * (93 - 65 + 1) + 65)
      );
    }

    await School.create({ _id: uuidv4(), name, schoolZip: zip, schoolCode });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
