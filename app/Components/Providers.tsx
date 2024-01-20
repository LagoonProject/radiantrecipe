"use client";

import { NextUIProvider } from "@nextui-org/react";
import { AuthContextProvider } from "@/context/AuthContext";

export function NextUIProviderComponent({
  children,
}: {
  children: any;
}) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export function AuthContextProviderComponent({
  children,
}: {
  children: any;
}) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
