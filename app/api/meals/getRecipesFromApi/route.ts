import getUser from "@/lib/auth/get-user";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";


// ingredients list must be separated by commmas

export async function POST(request: NextRequest) {
  const { recipeIds } = await request.json();

  // connect user to API
  // post to https://api.spoonacular.com/users/connect

  const user = await getUser();

  console.log("POST spoon getUser", user);

  const CONNECT_URL = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&ids=${recipeIds}`;


  try {
    // get meal plan from spoonacular

    const res = await fetch(CONNECT_URL);

    const recipes = await res.json();

    console.log("POST recipes", recipes)
  
    // store the meal plan in the database


  

    return NextResponse.json(recipes);
  } catch (error: any) {
    console.log("error fetching api", error.code);
    return NextResponse.json(error.code);
  }
}
