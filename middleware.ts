import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    cookieName: "AuthToken",
    cookieSignatureKeys: ["secret1", "secret2"],
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: false, // Set this to true on HTTPS environments
      sameSite: "lax" as const,
      maxAge: 14 * 60 * 60 * 24, // 14 days
    },
    serviceAccount: {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      clientEmail:process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL!,
      privateKey:process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!,
    },
  });
}

export const config = {
  matcher: [
    "/api/login",
    "/api/logout",
    "/",
    "/protected/:path*",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
  ],
};
