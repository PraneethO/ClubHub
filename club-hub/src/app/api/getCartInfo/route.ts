import dbConnect from "@/lib/connectDB";
import Club from "@/lib/models/Club";
import Student from "@/lib/models/Student";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  await dbConnect();

  const student = await Student.findOne({ email });

  const clubList = student.clubs;

  const clubInfoList = [];

  for (let i = 0; i < clubList.length; i++) {
    const club = await Club.findOne(
      { _id: clubList[i] },
      { picture: 1, name: 1, fees: 1, forms: 1 }
    );

    clubInfoList.push(club);
  }

  return NextResponse.json(
    { message: "Success", body: clubInfoList },
    { status: 200 }
  );
}
