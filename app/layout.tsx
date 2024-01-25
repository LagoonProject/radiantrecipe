import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProviderComponent } from "./Components/Providers";

import { NavBar } from "./Components/NavBar";
import { AuthProviderComponent } from "./Components/Providers";

import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Radiant Recipe",
  description:
    "An app that provides custom recipes tailored to your unique caloric needs and health goals.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviderComponent>
          <NextUIProviderComponent>
            <NavBar />
            {children}
          </NextUIProviderComponent>
        </AuthProviderComponent>
      </body>
    </html>
  );
}
