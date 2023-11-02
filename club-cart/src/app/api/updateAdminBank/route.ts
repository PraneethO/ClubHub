import Club from "@/lib/models/Club";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const club = await Club.findOneAndUpdate({ email }, { completedBank: true });

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
