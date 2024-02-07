import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function getTdeeInfoFromDb(userId: string) {
  const tdeeInfo = await prisma.user.findUnique({
    where: {
      id: userId, // Assuming the field is named 'id' in your model
    },
    select: {
      gender: true,
      heightCm: true,
      heightFeet: true,
      heightInches: true,
      weight: true,
      date_of_birth: true,
      units: true,
      activityLevel: true
    },
  });

  return tdeeInfo;
}
