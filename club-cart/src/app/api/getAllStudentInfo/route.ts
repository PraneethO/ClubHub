import dbConnect from "@/lib/connectDB";
import Student from "@/lib/models/Student";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  await dbConnect();

  const student = await Student.findOne(
    { email },
    { firstName: 1, lastName: 1, email: 1, school: 1 }
  );

  console.log(student);

  return NextResponse.json(
    { message: "Success", body: student },
    { status: 200 }
  );
}
