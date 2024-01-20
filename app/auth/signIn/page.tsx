"use client";

import Image from "next/image";

import { cookies } from "next/headers";
import { Spinner } from "@nextui-org/react";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [signInButtonClicked, setSignInButtonClicked] = useState(false);
  const router = useRouter();

  async function signIn() {
    setSignInButtonClicked(true);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="flex flex-col justify-center items-center w-full my-8">
        <p className="text-xl font-normal leading-relaxed my-4">
          Sign In with your email.
        </p>
        <div className="mt-2 flex w-2/6">
          <Input
            type="email"
            label="Email"
            onChange={(text) => setEmail(text.target.value)}
          />
        </div>

        <button
          className="text-xl font-semibold py-4 px-6 m-4 bg-slate-700 w-2/6 rounded-2xl"
          onClick={signIn}
          disabled={signInButtonClicked}
        >
          {signInButtonClicked ? <Spinner /> : "Sign In"}
        </button>
      </div>
    </main>
  );
}
