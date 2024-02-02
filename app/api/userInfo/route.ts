import { NextResponse } from "next/server";
import getUser from "@/lib/auth/get-user";
import prisma from "@/lib/prisma/prisma";

export async function POST(req: Request) {
  try {
    const user = await getUser();

    const body = await req.json();
    const userInfo = body.userInfo;

    console.log("Server POST userInfo", userInfo);

    if (!user) {
      throw new Error("Not authenticated");
    }

    await prisma.user.update({
      where: {
        id: user.user_id,
      },
      data: {
        gender: userInfo.gender,
        heightCm:
          userInfo.heightCm.length > 0 ? parseFloat(userInfo.heightCm) : null,
        heightFeet:
          userInfo.heightFeet.length > 0
            ? parseFloat(userInfo.heightFeet)
            : null,
        heightInches:
          userInfo.heightInches.length > 0
            ? parseFloat(userInfo.heightInches)
            : null,
        weight: userInfo.weight.length > 0 ? parseFloat(userInfo.weight) : null,
        date_of_birth: new Date(userInfo.dateOfBirth),
        units: userInfo.units,
      },
    });

    return NextResponse.json(
      { message: "User info updated." },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
