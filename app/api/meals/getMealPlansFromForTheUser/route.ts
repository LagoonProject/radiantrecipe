import getUser from "@/lib/auth/get-user";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

// ingredients list must be separated by commmas

export async function GET(request: NextRequest) {
  const user = await getUser();

  try {
    const mealPlans = await prisma.mealPlans.findMany({
      where: {
        userId: user?.user_id,
      },
    });

    console.log("mealPlans GET", mealPlans)

    return NextResponse.json(mealPlans);
  } catch (error: any) {
    console.log("error fetching api", error.code);
    return NextResponse.json(error.code);
  }
}
