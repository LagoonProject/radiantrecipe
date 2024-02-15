"use client";

import React from "react";
import { CheckIcon } from "../../Components/Icons";

export default function ThanksForSigningIn() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 text-slate-50">
      <div className="flex min-h-44 flex-col items-center justify-around">
        <CheckIcon color="#16a34a" size={48} />
        <h1>Thanks for creating your account!</h1>
        <h2 className="font-semibold text-xl">
          Go to your email inbox to login to your account and download your FREE
          PDF Guide.
        </h2>
        <h2>
          Don&apos;t forget to check your spam folder if you don&apos;t see our email.
        </h2>
        <h2>
          You can now close this window.
        </h2>
      </div>
    </main>
  );
}
