import dbConnect from "@/lib/connectDB";
import Club from "@/lib/models/Club";
import Student from "@/lib/models/Student";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  await dbConnect();

  const student = await Student.findOne({ email });

  return NextResponse.json(
    { message: "Success", body: student.clubs },
    { status: 200 }
  );
}
