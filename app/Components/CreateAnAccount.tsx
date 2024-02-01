"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import sendMagicEmail from "@/lib/auth/sendMagicEmail";
import { Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";


export const CreateAnAccount = () => {

    const [email, setEmail] = useState("");
    const [signInButtonClicked, setSignInButtonClicked] = useState(false);
  
    const router = useRouter();
  
    const submit = async () => {
      setSignInButtonClicked(true);
  
      await sendMagicEmail(email)

      setSignInButtonClicked(false);
  
      router.push("/thanksForSigningIn");
    };

  return (
    <div className="flex flex-col justify-center items-center w-full my-8">
      <p className="text-xl font-normal leading-relaxed my-4">
        Create an account to get access to your FREE PDF Guide.
      </p>
      <p className="text-xl font-normal leading-relaxed my-4">
        Simply provide your email to create an account.
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
  );
};
