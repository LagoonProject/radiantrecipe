"use client";

import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { Spinner } from "@nextui-org/react";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { sendMagicLink } from "@/lib/firebase/firebase-client-config";
import { setMagicEmail } from "@/lib/localStorage/magicEmail";
export default function Home() {
  const [email, setEmail] = React.useState("");
  const [signInButtonClicked, setSignInButtonClicked] = useState(false);
  const router = useRouter();

  async function signInProcess() {
    try {
      console.log("sign in proccess")
      setSignInButtonClicked(true);

      sendMagicLink(email, "http://localhost:3000/protected/welcome").then(() =>
        setMagicEmail(email)
      );

      router.push("/thanksForSigningIn");
    } catch (error) {

      console.log("sign in process", error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-3xl font-bold my-6">
        Welcome to the Radiant Recipe!
      </h1>

      <div className="flex flex-col justify-center items-center w-full my-8">
        <p className="text-xl font-normal leading-relaxed my-4">
          Sign In with your email to get access to your FREE PDF Guide.
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
          onClick={signInProcess}
          disabled={signInButtonClicked}
        >
          {signInButtonClicked ? <Spinner /> : "Sign In"}
        </button>
      </div>
    </main>
  );
}
