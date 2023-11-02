import dbConnect from "@/lib/connectDB";
import Club from "@/lib/models/Club";
import Student from "@/lib/models/Student";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, id } = await req.json();

  await dbConnect();

  const club = await Club.findOne({ _id: id });
  const student = await Student.findOne({ email });

  club.studentList.push(student.firstName + " " + student.lastName);
  student.clubs.push(club._id);
  club.save();
  student.save();

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
