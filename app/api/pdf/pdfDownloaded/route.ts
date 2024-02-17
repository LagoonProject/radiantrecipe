import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import getUser from "@/lib/auth/get-user";

export async function GET() {
  const user = await getUser();

  console.log("pdfDownloaded user ", user);

  if (!user) {
    throw new Error("Not authenticated");
  }

  const mealPlans = await prisma.mealPlans.findMany({
    where: {
      id: user.user_id,
    },
  });
  console.log("mealPlans findMany GET:", mealPlans);

  return NextResponse.json(mealPlans);
}
