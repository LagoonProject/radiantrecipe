import getUser from "@/lib/auth/get-user";
import { CreateAnAccount } from "./Components/CreateAnAccount";
import React, { useState } from "react";
import { DownloadPDFButton } from "./Components/DownloadPDFButton";
import { CalculateBMR } from "./Components/CalculateBMR";

export default async function Home() {
  const user = await getUser();

  console.log("home")

  return (
    <main className="dark text-foreground bg-background flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-3xl font-bold my-6">
        Welcome to Radiant Recipe!
      </h1>
      {!user && <CreateAnAccount />}
      {user && <DownloadPDFButton />}
      <CalculateBMR />
    </main>
  );
}
