"use client";

import React from "react";
import { Spinner } from "@nextui-org/react";

export default function Unauthenticated() {

    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Spinner />
      </main>
    );
  
}
