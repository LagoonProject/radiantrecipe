import getUser from "@/lib/auth/get-user";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { X } from "lucide-react";
import { IMealPlan } from "@/app/protected/myMealPlans/[tdee]/page";
// ingredients list must be separated by commmas

export async function POST(request: NextRequest) {
  const { tdee } = await request.json();

  // connect user to API
  // post to https://api.spoonacular.com/users/connect

  const user = await getUser();

  console.log("POST spoon getUser", user);

  const CONNECT_URL = `https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&timeframe=week&targetCalories=${tdee}`;

  const body = {
    userId: user?.user_id,
    email: user?.email,
  };

  try {
    // const res = await fetch(CONNECT_URL);

    //   const apiCredentials = await res.json()
    //   console.log("apiCredentials", apiCredentials);

    // const updatedUser = await prisma.user.update({
    //   where: {
    //     id: user?.user_id,
    //   },
    //   data: {
    //     spoonacularUsername: apiCredentials.username,
    //     spoonacularPassword: apiCredentials.spoonacularPassword,
    //     spoonacularHash: apiCredentials.hash,
    //   },
    // });

    const mealPlan = await res.json();
    console.log("meal plan", mealPlan);

    const previousMealPlansJson = await prisma.user.findUnique({
      where: {
        id: user?.user_id,
      },
      select: {
        mealPlans: true,
      },
    });

    let mealPlans;

    if (previousMealPlansJson && previousMealPlansJson.mealPlans) {
      const previousMealPlans =
        previousMealPlansJson.mealPlans as unknown as IMealPlan[];
      previousMealPlans
        ? (mealPlans = [...previousMealPlans, mealPlan])
        : (mealPlans = [mealPlan]);
    }

    await prisma.user.update({
      where: {
        id: user?.user_id,
      },
      data: { mealPlans },
    });

    return NextResponse.json(mealPlan);
  } catch (error: any) {
    console.log("error fetching api", error.code);
    return NextResponse.json(error.code);
  }
}
