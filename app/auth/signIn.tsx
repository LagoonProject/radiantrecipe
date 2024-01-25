"use client";
import React, { useState } from "react";
import signIn from "@/lib/auth/signinWithMagicEmail";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";

function Page() {
  const [signInButtonClicked, setSignInButtonClicked] = useState(false);

  const [email, setEmail] = React.useState("");

  const router = useRouter();

  const handleForm = async (event: any) => {
    event.preventDefault();
    await signIn();
    return router.push("/thanksForSigningIn");
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign In</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>

          <button
            className="text-xl font-semibold py-4 px-6 m-4 bg-slate-700 w-2/6 rounded-2xl"
            disabled={signInButtonClicked}
          >
            {signInButtonClicked ? <Spinner /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
