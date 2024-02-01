import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//Route handler for logout endpoint that expires the session cookie
export async function POST() {
  const options = {
    name: "radiant_recipe_session",
    value: "",
    maxAge: -1,
  };

  cookies().set(options);
  return NextResponse.json({}, { status: 200 });

}