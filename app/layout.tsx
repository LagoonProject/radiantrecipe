import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "./Components/Providers";
import { AppContextProvider } from "./Components/Providers";
import { cn } from "@/lib/utils";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { twMerge } from "tailwind-merge";

import { NavBar } from "./Components/NavBar/NavBar";

import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Radiant Recipe",
  description:
    "An app that provides custom recipes tailored to your unique caloric needs and health goals.",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AppContextProvider>
          <PrimeReactProvider
            value={{
              unstyled: true,
              pt: {},
              // ptOptions: {
              //   mergeSections: true,
              //   mergeProps: true,
              //   classNameMergeFunction: twMerge,
              // },
            }}
          >
            <NextUIProvider>
              <NavBar />
              {children}
            </NextUIProvider>
          </PrimeReactProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
