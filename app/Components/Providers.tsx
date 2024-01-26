"use client";

import { NextUIProvider } from "@nextui-org/react";

import * as React from "react";

export function NextUIProviderComponent({ children }: { children: any }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
