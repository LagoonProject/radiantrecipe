import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProviderComponent } from "./Components/Providers";
import { AuthContextProvider } from "@/context/AuthContext";
import { NavBar } from "./Components/NavBar";
const inter = Inter({ subsets: ["latin"] });
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./utils/firebaseConfig";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { Tokens, getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";

import { User } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Radiant Recipe",
  description:
    "An app that provides custom recipes tailored to your unique caloric needs and health goals.",
};

export interface AuthProviderProps {
  serverUser: User | null;
  children: React.ReactNode;
}

const toUser = ({ decodedToken }: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
  } = decodedToken;

  const customClaims = filterStandardClaims(decodedToken);

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    customClaims,
  };
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens = await getTokens(cookies(), {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    cookieName: "AuthToken",
    cookieSignatureKeys: ["secret1", "secret2"],
    serviceAccount: {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!,
    },
  });
  const user = tokens ? toUser(tokens) : null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider serverUser={user}>
          <NextUIProviderComponent>
            <NavBar />
            {children}
          </NextUIProviderComponent>
        </AuthContextProvider>
      </body>
    </html>
  );
}
