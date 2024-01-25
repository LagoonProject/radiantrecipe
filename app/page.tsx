"use client";

import Image from "next/image";
import { cookies } from "next/headers";
import { Spinner } from "@nextui-org/react";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSendSignInLinkToEmail } from "react-firebase-hooks/auth";
import { clientAuth } from "./firebase/firebase-client-config";
import sendMagicEmail from "@/lib/auth/sendMagicEmail";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [signInButtonClicked, setSignInButtonClicked] = useState(false);



  const router = useRouter();

  const submit = async () => {
    setSignInButtonClicked(true);

    const success = await sendMagicEmail(email)

    console.log("success", success);
    setSignInButtonClicked(false);

    router.push("/thanksForSigningIn");
  };

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
