import dbConnect from "@/lib/connectDB";
import Club from "@/lib/models/Club";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  await dbConnect();

  const club = await Club.findOne({ email });

  return NextResponse.json(
    {
      message: "Success",
      body: {
        name: club.name,
        completedSetup: club.completedSetup,
        completedBank: club.completedBank,
        studentList: club.studentList,
        paidStudentList: club.paidStudentList,
        fees: club.fees,
      },
    },
    { status: 200 }
  );
}
