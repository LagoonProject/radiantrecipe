import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { getUserFromDb } from "../actions/getUserFromDb";
//Route handler login endpoint that
//gets the client ID token from headers
//verifies it
//creates a session cookie
//and sets it in the browser
//the session can then be verified with getUser()



async function addUserToDb(userId: string, email: string) {
  const newUser = await prisma.user.create({
    data: {
      id: userId,
      email,
    },
  });

  console.log("newuser POST", newUser);
}

export async function POST() {
  const authorization = headers().get("Authorization");

  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    console.log("decodedToken POST", decodedToken);

    if (decodedToken) {
      const expiresIn = 60 * 60 * 24 * 14 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: "radiant_recipe_session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      cookies().set(options);

      const user = await getUserFromDb(decodedToken.user_id);

      if (!user) {
        await addUserToDb(decodedToken.user_id, decodedToken.email as string);
      }
    }
  }

  return NextResponse.json({}, { status: 200 });
}
