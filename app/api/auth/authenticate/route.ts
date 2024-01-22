import {
  createSessionCookie,
  getIdTokenFromSessionCookie,
  verifyIdToken,
} from "@/lib/firebase/firebase-admin-config";
import { TWO_WEEK_IN_SECONDS } from "@/lib/constants";
import { NextResponse, NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";


export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";

  // console.log("GET Session", session)

  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await getIdTokenFromSessionCookie(session);

  console.log("decodedClaims", decodedClaims)

  if (!decodedClaims) {

    console.log("shoot le 401")
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}
