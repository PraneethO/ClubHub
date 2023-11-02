import dbConnect from "@/lib/connectDB";
import Club from "@/lib/models/Club";

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { NextResponse, NextRequest } from "next/server";
import Student from "@/lib/models/Student";

export async function POST(req: NextRequest) {
  const {
    type,
    firstName,
    lastName,
    email,
    password,
    school,
    name,
    sponsorName,
  } = await req.json();

  await dbConnect();

  if (type) {
    if (await Club.findOne({ email })) {
      return NextResponse.json(
        { message: "Duplicate User Exists" },
        { status: 401 }
      );
    }

    const saltRounds = 10;
    const encryptedPass = await bcrypt.hash(password, saltRounds);

    try {
      await Club.create({
        _id: uuidv4(),
        name,
        email,
        password: encryptedPass,
        school,
        sponsorName,
      });
      return NextResponse.json({ message: "Success" }, { status: 201 });
    } catch (err) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    if (await Student.findOne({ email })) {
      return NextResponse.json(
        { message: "Duplicate User Exists" },
        { status: 401 }
      );
    }

    const saltRounds = 10;
    const encryptedPass = await bcrypt.hash(password, saltRounds);

    try {
      await Student.create({
        _id: uuidv4(),
        firstName,
        lastName,
        email,
        password: encryptedPass,
        school,
      });
      return NextResponse.json({ message: "Success" }, { status: 201 });
    } catch (err) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Idk how we got here" }, { status: 500 });
}
