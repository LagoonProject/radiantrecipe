"use client";

import { NextUIProvider } from "@nextui-org/react";

import * as React from "react";

import { AuthContextProvider } from "@/context/context";


export function NextUIProviderComponent({ children }: { children: any }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}




export function AuthProviderComponent({ children }: { children: any }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}