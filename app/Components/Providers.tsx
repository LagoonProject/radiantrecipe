"use client";

import { NextUIProvider } from "@nextui-org/react";
import { AuthContextProvider } from "@/context/AuthContext";
import * as React from "react";

import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { Tokens, getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";

import { User } from "@/context/AuthContext";

export function NextUIProviderComponent({ children }: { children: any }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}




