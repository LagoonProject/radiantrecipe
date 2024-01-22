import {
    createSessionCookie,
    getIdTokenFromSessionCookie,
    verifyIdToken,
  } from "@/lib/firebase/firebase-admin-config";
  import { TWO_WEEK_IN_SECONDS } from "@/lib/constants";
  import { NextResponse, NextRequest } from "next/server";
  import { cookies, headers } from "next/headers";
  import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
  
  export async function POST(req: NextRequest) {
    console.log("req", req.headers)
    const authHeader = req.headers.get("Authorization") || "";
    const [scheme, token] = authHeader.split(" ");
  
    if (scheme !== "Bearer" || !token) {
      console.log("shoot no bearer")
      return { status: 401, body: "invalid authorization header" };
    }
  
    try {
      const { sub, email } = await verifyIdToken(token);
  
      console.log(" sub, email", sub, email);
  
      let sessionCookie;
  
      try {
        sessionCookie = await createSessionCookie(token, TWO_WEEK_IN_SECONDS);
  
        console.log("POST sessionCookie", sessionCookie);
      } catch (error) {
        console.log("POST session error", error);
      }
  
      const user = {
        id: sub,
        email,
      };
  
      console.log("POST user", user);
  
      const options: ResponseCookie = {
        name: "session",
        value: sessionCookie!,
        maxAge: TWO_WEEK_IN_SECONDS,
        httpOnly: true,
        secure: true,
      };
  
      //Add the cookie to the browser
      cookies().set(options);
  
      return NextResponse.json(
        {},
        {
          status: 200,
        }
      );
    } catch {
      return NextResponse.json({ message: "invalid token" }, { status: 401 });
    }
  }