import dbConnect from "@/lib/connectDB";
import Club from "@/lib/models/Club";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  await dbConnect();

  const club = await Club.findOne({ _id: id });

  const responseData = {
    name: club.name,
    description: club.description,
    picture: club.picture,
    dues: club.fees,
    email: club.email,
    meetingDay: club.meetingDay,
  };

  return NextResponse.json(
    { message: "Success", body: responseData },
    { status: 200 }
  );
}
