import getUser from "@/lib/auth/get-user";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { X } from "lucide-react";

// ingredients list must be separated by commmas

export async function POST(request: NextRequest) {
  const { tdeeTarget } = await request.json();

  // connect user to API
  // post to https://api.spoonacular.com/users/connect

  const user = await getUser();

  console.log("POST spoon getUser", user);

  const CONNECT_URL = `https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&timeframe=week&targetCalories=${tdeeTarget}`;



  try {
    // get meal plan from spoonacular

    const res = await fetch(CONNECT_URL);

    const mealPlan = await res.json();

    console.log("POST mealPlan", mealPlan)
  
    // store the meal plan in the database

    const newMealPlan = await prisma.mealPlans.create({
      data: {
        weightGoal: tdeeTarget,
        mealPlan: mealPlan,
        userId: user?.user_id,
      },
    });

    console.log("newMealPlan", newMealPlan)
  

    return NextResponse.json(newMealPlan);
  } catch (error: any) {
    console.log("error fetching api", error.code);
    return NextResponse.json(error.code);
  }
}
