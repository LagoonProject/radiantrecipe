"use client";

import { NextUIProvider as  NextUI} from "@nextui-org/react";
import { AppContextProvider as AppContext} from "@/context/context";

import * as React from "react";

export function NextUIProvider({ children }: { children: any }) {
  return <NextUI>{children}</NextUI>;
}


export function AppContextProvider({ children }: { children: any }) {
  return <AppContext>{children}</AppContext>;
}
