import { NextResponse } from "next/server";
import getUser from "@/lib/auth/get-user";
import prisma from "@/lib/prisma/prisma";

export async function POST(req: Request) {
  try {
    const user = await getUser();

    const body = await req.json();
    const tdeeInfoForm = body.tdeeInfoForm;

    console.log("Server POST tdeeInfoForm", tdeeInfoForm);

    if (!user) {
      throw new Error("Not authenticated");
    }

    const updatedUserInfo = await prisma.user.update({
      where: {
        id: user.user_id,
      },
      data: {
        gender: tdeeInfoForm.gender,
        heightCm:
          tdeeInfoForm.heightCm.length > 0
            ? parseFloat(tdeeInfoForm.heightCm)
            : null,
        heightFeet:
          tdeeInfoForm.heightFeet.length > 0
            ? parseFloat(tdeeInfoForm.heightFeet)
            : null,
        heightInches:
          tdeeInfoForm.heightInches.length > 0
            ? parseFloat(tdeeInfoForm.heightInches)
            : null,
        weight:
          tdeeInfoForm.weight.length > 0 ? parseFloat(tdeeInfoForm.weight) : null,
        date_of_birth: new Date(tdeeInfoForm.dateOfBirth),
        units: tdeeInfoForm.units,
        activityLevel: tdeeInfoForm.activityLevel,
      },
    });

    console.log("updatedUserInfo dans server", updatedUserInfo);

    return NextResponse.json(updatedUserInfo, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
