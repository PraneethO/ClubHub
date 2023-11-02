import dbConnect from "@/lib/connectDB";
import Club from "@/lib/models/Club";
import Form from "@/lib/models/Form";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  await dbConnect();

  const club = await Club.findOne({ email });

  let formList: { name: String; link: String }[] = [];

  club.forms.map(async (formId: any) => {
    const formData = await Form.findOne({ _id: formId });

    formList.push({ name: formData.name, link: formData.link });
  });

  return NextResponse.json(
    {
      message: "Success",
      body: {
        meetingDay: club.meetingDay,
        dues: club.fees,
        description: club.description,
        forms: club.forms.length,
        formList: formList,
        picture: club.picture,
      },
    },
    { status: 200 }
  );
}
