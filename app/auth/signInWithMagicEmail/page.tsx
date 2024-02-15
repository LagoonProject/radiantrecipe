"use client";

import Image from "next/image";
import { cookies } from "next/headers";
import { Spinner } from "@nextui-org/react";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import sendMagicEmail from "@/lib/auth/sendMagicEmail";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [signInButtonClicked, setSignInButtonClicked] = useState(false);

  const router = useRouter();

  const submit = async () => {
    setSignInButtonClicked(true);

    await sendMagicEmail(email);

    setSignInButtonClicked(false);

    router.push("/protected/thanksForSigningIn");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-3xl font-bold my-6">Sign in to your account </h1>

      <div className="flex flex-col justify-center items-center w-full my-8">
        <p className="text-xl font-normal leading-relaxed my-4">
          Please provide your email.
        </p>
        <div className="mt-2 flex w-2/6">
          <Input
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="text-xl font-semibold py-4 px-6 m-4 bg-slate-700 w-2/6 rounded-2xl"
          disabled={signInButtonClicked}
          onClick={submit}
        >
          {signInButtonClicked ? <Spinner /> : "Sign In"}
        </button>
      </div>
    </main>
  );
}
