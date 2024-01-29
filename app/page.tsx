import getUser from "@/lib/auth/get-user";
import { CreateAnAccount } from "./Components/CreateAnAccount";
import React, { useState } from "react";
import { DownloadPDFButton } from "./Components/DownloadPDFButton";

export default async function Home() {
  const user = await getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-3xl font-bold my-6">
        Welcome to the Radiant Recipe!
      </h1>
      {!user && <CreateAnAccount />}
      <DownloadPDFButton />
    </main>
  );
}
