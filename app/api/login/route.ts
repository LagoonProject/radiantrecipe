import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

//Route handler login endpoint that
//gets the client ID token from headers
//verifies it
//creates a session cookie
//and sets it in the browser
//the session can then be verified with getUser()
export async function POST() {
  const authorization = headers().get("Authorization");

  console.log("authorization", authorization);
  if (authorization?.startsWith("Bearer ")) {
    console.log("dans if Post request handler");

    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);
    console.log("decodedToken", decodedToken);

    if (decodedToken) {
      console.log("dans decodedToken");

      const expiresIn = 60 * 60 * 24 * 14 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      cookies().set(options);
    }
  }

  return NextResponse.json({}, { status: 200 });

}
