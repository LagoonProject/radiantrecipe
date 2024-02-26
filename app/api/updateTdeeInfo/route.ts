import { NextResponse } from "next/server";
import getUser from "@/lib/auth/get-user";
import prisma from "@/lib/prisma/prisma";

export async function POST(req: Request) {
  try {
    const user = await getUser();

    const body = await req.json();
    const tdeeFormData = body.tdeeFormData;

    console.log("Server POST tdeeFormData", tdeeFormData);

    if (!user) {
      throw new Error("Not authenticated");
    }

    const updatedUserInfo = await prisma.user.update({
      where: {
        id: user.user_id,
      },
      data: {
        gender: tdeeFormData.gender,
        heightCm:
          tdeeFormData.heightCm.length > 0
            ? parseFloat(tdeeFormData.heightCm)
            : null,

        heightInches: tdeeFormData.heightInches,

        weight:
          tdeeFormData.weight.length > 0
            ? parseFloat(tdeeFormData.weight)
            : null,
        date_of_birth: new Date(tdeeFormData.dateOfBirth),
        units: tdeeFormData.units,
        activityLevel: tdeeFormData.activityLevel,
      },
    });

    console.log("updatedUserInfo dans server", updatedUserInfo);

    return NextResponse.json(updatedUserInfo, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
