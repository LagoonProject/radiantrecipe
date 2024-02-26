import getUser from "@/lib/auth/get-user";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

import { MealPlan } from "@/app/protected/myMealPlans/[tdeeTarget]/page";

// ingredients list must be separated by commmas

const extractMealIds = (mealPlan: MealPlan): number[] => {
  const mealIds: number[] = [];

  Object.values(mealPlan.week).forEach((dailyMeals) => {
    dailyMeals.meals.forEach((meal) => {
      mealIds.push(meal.id);
    });
  });

  return mealIds;
};

export async function POST(request: NextRequest) {
  const { tdeeTarget } = await request.json();

  // connect user to API
  // post to https://api.spoonacular.com/users/connect

  const user = await getUser();

  console.log("POST spoon getUser", user);

  const MEALPLAN_URL = `https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&timeframe=week&targetCalories=${tdeeTarget}`;

  try {
    // get meal plan from spoonacular

    const res = await fetch(MEALPLAN_URL);

    const mealPlan = await res.json();

    console.log("POST mealPlan", mealPlan);

    const recipeIds = extractMealIds(mealPlan);

    console.log("POST recipeIds", recipeIds);

    const RECIPES_URL = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&ids=${recipeIds}&includeNutrition=true`;

    console.log("POST RECIPES_URL", RECIPES_URL);

    const resRecipes = await fetch(RECIPES_URL);

    const recipes = await resRecipes.json();

    // console.log("POST recipes", recipes);

    // store the meal plan in the database

    const newMealPlan = await prisma.mealPlans.create({
      data: {
        caloriesGoal: parseInt(tdeeTarget),
        mealPlan: mealPlan,
        userId: user?.user_id,
        recipes: recipes,
      },
    });

    console.log("newMealPlan", newMealPlan);

    return NextResponse.json(newMealPlan);
  } catch (error: any) {
    console.log("error fetching api", error);
    return NextResponse.json(error.code);
  }
}
